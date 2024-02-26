using Core.Entities;

namespace Core.Specifications.Products
{
    public class ProductForCountingSpecification(ProductSpecificationParams productParams) : Specification<Product>(product => (string.IsNullOrEmpty(productParams.Search) || product.Name!.Contains(productParams.Search)) && (!productParams.Brand.HasValue || product.BrandId == productParams.Brand) && (!productParams.Category.HasValue || product.CategoryId == productParams.Category))
    { }
}