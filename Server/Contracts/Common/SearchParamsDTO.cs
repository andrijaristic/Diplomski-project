﻿namespace Contracts.Common
{
    public class SearchParamsDTO
    {
        public string ArrivalDate { get; set; }
        public string DepartureDate { get; set; }
        public string Adults { get; set; }
        public string Children { get; set; }
        public string MinPrice { get; set; }
        public string MaxPrice { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public string Sort { get; set; }
        public List<Guid> Amenities { get; set; }
        public int Page { get; set; }
    }
}
