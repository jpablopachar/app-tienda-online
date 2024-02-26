using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : Base
    {
        Task<TEntity?> GetByIdAsync(int id);

        Task<IReadOnlyList<TEntity>> GetAllAsync();

        Task<TEntity> GetByIdWithSpec(ISpecification<TEntity> spec);

        Task<IReadOnlyList<TEntity>> GetAllWithSpec(ISpecification<TEntity> spec);

        Task<int> CountAsync(ISpecification<TEntity> spec);

        Task<int> AddAsync(TEntity entity);

        Task<int> UpdateAsync(TEntity entity);

        void AddEntity(TEntity entity);

        void UpdateEntity(TEntity entity);

        void DeleteEntity(TEntity entity);
    }
}