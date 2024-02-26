namespace WebApi.Dtos
{
    public class PaginationDto<TEntity> where TEntity : class
    {
        public int Count { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public IReadOnlyList<TEntity>? Data { get; set; }
        public int PageCount { get; set; }
    }
}