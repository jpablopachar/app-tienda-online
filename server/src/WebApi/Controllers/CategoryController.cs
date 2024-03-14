using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class CategoryController(IGenericRepository<Category> categoryRepository) : ApiController
    {
        private readonly IGenericRepository<Category> _categoryRepository = categoryRepository;

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category?>> GetCategory(int id)
        {
            return await _categoryRepository.GetByIdAsync(id);
        }
    }
}