namespace Contracts.Common
{
    public class PagedListDTO<T> where T : class
    {
        public IReadOnlyList<T> Items { get; set; }
        public int Page { get; set; }
        public int TotalPages { get; set; }
    }
}
