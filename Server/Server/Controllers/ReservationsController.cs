﻿using Contracts.ReservationDTOs;
using Domain.Interfaces.Services;
using Domain.Models.AppSettings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe.Checkout;

namespace Web.API.Controllers
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService _reservationsService;
        private readonly IOptions<AppSettings> _settings;
        public ReservationsController(IReservationsService reservationsService, IOptions<AppSettings> settings)
        {
            _reservationsService = reservationsService;
            _settings = settings;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserReservations(Guid id)
        {
            List<DisplayReservationDTO> displayReservationDTOs = await _reservationsService.GetReservations(id);
            return Ok(displayReservationDTOs);
        }

        [HttpPost("in-person-payment")]
        [Authorize]
        public async Task<IActionResult> CreateReservationWithoutPayment([FromBody] NewReservationDTO newReservationDTO)
        {
            DisplayReservationDTO displayReservationDTO = await _reservationsService.CreateReservation(newReservationDTO, false);
            return CreatedAtAction(nameof(GetUserReservations), new { id = displayReservationDTO.Id }, displayReservationDTO);
        }

        [HttpPost("online-payment")]
        [Authorize]
        public async Task<IActionResult> CreateReservationWithPayment([FromBody] NewReservationDTO newReservationDTO)
        {
            DisplayReservationDTO displayReservationDTO = await _reservationsService.CreateReservation(newReservationDTO, true);
            var domain = "http://localhost:5173";
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment",
                SuccessUrl = domain + "/account/reservations",
                CancelUrl = domain
            };

            var sessionLineItem = new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = (long)(displayReservationDTO.Price * 100),
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = $"{displayReservationDTO.AccommodationName} Reservation"
                    },
                },
                Quantity = 1
            };

            options.LineItems.Add(sessionLineItem);

            var service = new SessionService();
            Session session = service.Create(options);
            //Response.Headers.Add("Location", session.Url);

            return Ok(session.Url);
            //return CreatedAtAction(nameof(Post), new { id = displayReservationDTO.Id }, displayReservationDTO);
        }

        [HttpPut("cancel/{id}")]
        [Authorize]
        public async Task<IActionResult> CancelReservation(Guid id)
        {
            DisplayReservationDTO displayReservationDTO = await _reservationsService.CancelReservation(id, User.Identity.Name);
            return Ok(displayReservationDTO);
        }
    }
}
