namespace Contracts.SeasonalPricingDTOs
{
    public class SeasonalPricingMinimalDTO
    {
        public Guid Id { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
    }
}
