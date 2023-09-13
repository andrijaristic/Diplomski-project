﻿namespace Contracts.SeasonalPricingDTOs
{
    public class DisplaySeasonalPricingDTO
    {
        public Guid Id { get; set; }
        public string Season { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Price { get; set; }
    }
}
