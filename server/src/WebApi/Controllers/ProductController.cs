using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Products;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Errors;

namespace WebApi.Controllers
{
    public class ProductController(IGenericRepository<Product> productRepository, IMapper mapper) : ApiController
    {
        private readonly IGenericRepository<Product> _productRepository = productRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<PaginationDto<Product>>> GetProducts([FromQuery] ProductSpecificationParams productParams)
        {
            var specification = new ProductWithCategoryAndBrandSpecification(productParams);

            var products = await _productRepository.GetAllWithSpec(specification);

            var countSpecification = new ProductForCountingSpecification(productParams);

            var totalProducts = await _productRepository.CountAsync(countSpecification);

            var rounded = Math.Ceiling(Convert.ToDecimal(totalProducts) / Convert.ToDecimal(productParams.PageSize));
            var totalPages = Convert.ToInt32(rounded);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);

            return Ok(new PaginationDto<ProductDto>
            {
                Count = totalProducts,
                Data = data,
                PageCount = totalPages,
                PageIndex = productParams.PageIndex,
                PageSize = productParams.PageSize
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var specification = new ProductWithCategoryAndBrandSpecification(id);
            var product = await _productRepository.GetByIdWithSpec(specification);

            if (product == null) return NotFound(new CodeErrorResponse(404, "El producto no existe"));

            return _mapper.Map<Product, ProductDto>(product);
        }
    }
}