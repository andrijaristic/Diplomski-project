using Domain.Models;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Utilities.DataInitializers;

namespace Service.Utilities.DataInitializers
{
    public class AccommodationDataInitializer : IAccommodationDataInitializer
    {
        private readonly IUnitOfWork _unitOfWork;

        public AccommodationDataInitializer(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void InitializeData()
        {
            Task<IEnumerable<Accommodation>> task = _unitOfWork.Accommodations.GetAll();
            task.Wait();

            if (task.Result.Count() > 0)
            {
                return;
            }

            Task<IEnumerable<Amenity>> amenityTask = _unitOfWork.Amenities.GetAll();
            List<Amenity> amenities = new List<Amenity>();
            if (amenityTask.Result != null)
            {
                amenities = amenityTask.Result.ToList();
                amenities.RemoveAt(amenities.Count - 1);
                amenities.RemoveAt(amenities.Count - 1);
            }

            Accommodation accommodation = new Accommodation()
            {
                Id = Guid.Parse("750aa954-453c-4eb7-7519-08dbb86249af"),
                IsVisible = true,
                IsDeleted = false,
                Name = "Lorem ipsum dolor sit",
                Description = "Dummy Accommodation description",
                AverageGrade = 1,
                ThumbnailImage = new AccommodationImage()
                {
                    Id = Guid.Parse("5d5d5d2e-94f8-490c-4a26-08dbb86249c1"),
                    ImageURL = "benchesOutside750aa954-453c-4eb7-7519-08dbb86249af.jpg",
                },
                UserId = Guid.Parse("111467e6-41b4-4d44-9652-08dbb480deb8"),
                Country = "Serbia",
                Area = "Trstenik",
                Latitude = 43.620060047095684,
                Longitude = 21.000092625617985,
                StartingPrice = 30,
                RoomTypes = new List<RoomType>()
                {
                    new RoomType()
                    {
                        Id = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                        Adults = 2,
                        Children = 2,
                        AccommodationId = Guid.Parse("750aa954-453c-4eb7-7519-08dbb86249af"),
                        IsDeleted = false,
                        SeasonalPricing = new List<SeasonalPricing>()
                        {
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Jan-23 11:00:00"),
                                EndDate = DateTime.Parse("31-Jan-23 11:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 30
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Feb-23 11:00:00"),
                                EndDate = DateTime.Parse("28-Feb-23 11:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 35
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Mar-23 11:00:00"),
                                EndDate = DateTime.Parse("31-Mar-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 40
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Apr-23 10:00:00"),
                                EndDate = DateTime.Parse("30-Apr-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 45
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-May-23 10:00:00"),
                                EndDate = DateTime.Parse("31-May-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 50
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Jun-23 10:00:00"),
                                EndDate = DateTime.Parse("30-Jun-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 55
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Jul-23 10:00:00"),
                                EndDate = DateTime.Parse("31-Jul-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 60
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Aug-23 10:00:00"),
                                EndDate = DateTime.Parse("31-Aug-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 65
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Sep-23 10:00:00"),
                                EndDate = DateTime.Parse("30-Sep-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 60
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Oct-23 10:00:00"),
                                EndDate = DateTime.Parse("31-Oct-23 10:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 50
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Nov-23 11:00:00"),
                                EndDate = DateTime.Parse("30-Nov-23 11:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 40
                            },
                            new SeasonalPricing()
                            {
                                StartDate = DateTime.Parse("01-Dec-23 11:00:00"),
                                EndDate = DateTime.Parse("31-Dec-23 11:00:00"),
                                RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                                Price = 30
                            }
                        }
                    }
                },
                Rooms = new List<Room>()
                {
                    new Room()
                    {
                        Id = Guid.Parse("5394c198-a445-4134-c277-08dbb86252fb"),
                        RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                        AccommodationId = Guid.Parse("750aa954-453c-4eb7-7519-08dbb86249af"),
                        IsDeleted = false
                    },
                    new Room()
                    {
                        Id = Guid.Parse("28c8083e-2426-43a7-c278-08dbb86252fb"),
                        RoomTypeId = Guid.Parse("071056ff-9ec4-4e38-fcb0-08dbb86252f9"),
                        AccommodationId = Guid.Parse("750aa954-453c-4eb7-7519-08dbb86249af"),
                        IsDeleted = false
                    }
                },
                Reservations = new List<Reservation>()
                {
                    new Reservation() 
                    {
                        Id = Guid.Parse("33e997ce-def5-4639-0685-08dbb862b98f"),
                        UserId = Guid.Parse("111467e6-41b4-4d44-9652-08dbb480deb8"),
                        AccommodationId = Guid.Parse("750aa954-453c-4eb7-7519-08dbb86249af"),
                        RoomId = Guid.Parse("5394c198-a445-4134-c277-08dbb86252fb"),
                        Price = 120,
                        ArrivalDate = DateTime.Parse("10-Sep-23 10:00:00"),
                        DepartureDate = DateTime.Parse("12-Sep-23 10:00:00"),
                        IsPayed = true,
                        IsCancelled = false
                    }
                }
            };

            foreach (Amenity amenity in amenities)
            {
                amenity.Accommodations = new List<Accommodation>()
                {
                    accommodation
                };
            }

            _unitOfWork.Accommodations.Add(accommodation);
            _unitOfWork.Save().Wait();
        }
    }
}
