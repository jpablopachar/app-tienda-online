using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class BrandController(IGenericRepository<Brand> brandRepository) : ApiController
    {
        private readonly IGenericRepository<Brand> _brandRepository = brandRepository;

        [HttpGet]
        public async Task<ActionResult<List<Brand>>> GetBrands()
        {
            var brands = await _brandRepository.GetAllAsync();

            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand?>> GetBrand(int id)
        {
            return await _brandRepository.GetByIdAsync(id);
        }
    }
}