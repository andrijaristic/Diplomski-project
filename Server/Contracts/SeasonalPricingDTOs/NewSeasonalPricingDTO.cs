namespace Contracts.SeasonalPricingDTOs
{
    public class NewSeasonalPricingDTO
    {
        public Guid Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Price { get; set; }
    }
}
