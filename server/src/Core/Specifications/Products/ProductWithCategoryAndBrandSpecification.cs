using Core.Entities;

namespace Core.Specifications.Products
{
    public class ProductWithCategoryAndBrandSpecification : Specification<Product>
    {
        public ProductWithCategoryAndBrandSpecification(ProductSpecificationParams productParams) : base(product => (string.IsNullOrEmpty(productParams.Search) || product.Name!.Contains(productParams.Search)) && (!productParams.Brand.HasValue || product.BrandId == productParams.Brand) && (!productParams.Category.HasValue || product.CategoryId == productParams.Category))
        {
            AddInclude(product => product.Category!);
            AddInclude(product => product.Brand!);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "nameAsc":
                        AddOrderBy(product => product.Name!);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(product => product.Name!);
                        break;
                    case "priceAsc":
                        AddOrderBy(product => product.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(product => product.Price);
                        break;
                    case "descriptionAsc":
                        AddOrderBy(product => product.Description!);
                        break;
                    case "descriptionDesc":
                        AddOrderByDescending(product => product.Description!);
                        break;
                    default:
                        AddOrderBy(product => product.Name!);
                        break;
                }
            }
        }

        public ProductWithCategoryAndBrandSpecification(int id) : base(product => product.Id == id)
        {
            AddInclude(product => product.Category!);
            AddInclude(product => product.Brand!);
        }
    }
}