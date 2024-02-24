using BusinessLogic.Data;
using Core.Entities;
using Core.Interfaces;
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

        public void DeleteEntity(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public async Task<IReadOnlyList<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
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
    }
}