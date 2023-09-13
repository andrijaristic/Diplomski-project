using AutoMapper;
using Contracts.Common;

namespace Service.Helpers
{
    internal static class PaginationHelper<TModel, TDto>
        where TModel : class
        where TDto : class
    {
        public static PagedListDTO<TDto> CreatePagedListDTO(IEnumerable<TModel> items, int page, int itemsPerPage, IMapper mapper)
        {
            int count = items.Count();
            int totalPages = (int)Math.Ceiling(count / (double)itemsPerPage);

            page = page < 1 ? 1 : page;
            page = page > totalPages ? totalPages : page;

            List<TModel> pagedItems = count == 0 ? items.ToList() : items.Skip((page - 1) * itemsPerPage)
                                                                         .Take(itemsPerPage)
                                                                         .ToList();

            return new PagedListDTO<TDto>()
            {
                Items = mapper.Map<IReadOnlyList<TDto>>(pagedItems),
                Page = page,
                TotalPages = totalPages
            };
        }
    }
}
