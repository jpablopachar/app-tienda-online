using BusinessLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Logic
{
    public class GenericRepository<TEntity>(MarketDbContext context) : IGenericRepository<TEntity> where TEntity : Base
    {
        private readonly MarketDbContext _context = context;

        public async Task<int> AddAsync(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);

            return await _context.SaveChangesAsync();
        }

        public void AddEntity(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
        }

        public async Task<int> CountAsync(ISpecification<TEntity> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public void DeleteEntity(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public async Task<IReadOnlyList<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public Task<IReadOnlyList<TEntity>> GetAllWithSpec(ISpecification<TEntity> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public Task<TEntity> GetByIdWithSpec(ISpecification<TEntity> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateAsync(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);

            _context.Entry(entity).State = EntityState.Modified;

            return await _context.SaveChangesAsync();
        }

        public void UpdateEntity(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);

            _context.Entry(entity).State = EntityState.Modified;
        }

        private IQueryable<TEntity> ApplySpecification(ISpecification<TEntity> specification)
        {
            return SpecificationEvaluator<TEntity>.GetQuery(_context.Set<TEntity>().AsQueryable(), specification);
        }
    }
}