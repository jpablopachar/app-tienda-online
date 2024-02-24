using BusinessLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Logic
{
    public class ProductRepository(MarketDbContext context) : IProductRepository
    {
        private readonly MarketDbContext _context = context;

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products!.Include(product => product.Brand).Include(product => product.Category).FirstOrDefaultAsync(product => product.Id == id)!;
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products!.Include(product => product.Brand).Include(product => product.Category).ToListAsync();
        }
    }
}