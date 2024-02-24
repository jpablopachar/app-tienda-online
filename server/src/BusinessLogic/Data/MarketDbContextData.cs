using System.Text.Json;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.Data
{
    public class MarketDbContextData
    {
        public static async Task LoadDataAsync(MarketDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (context.Brands!.Any())
                {
                    var brandData = File.ReadAllText("../BusinessLogic/LoadData/brand.json");
                    var brands = JsonSerializer.Deserialize<List<Brand>>(brandData);

                    foreach (var brand in brands!)
                    {
                        context.Brands!.Add(brand);
                    }

                    await context.SaveChangesAsync();
                }

                if (context.Categories!.Any())
                {
                    var categoryData = File.ReadAllText("../BusinessLogic/LoadData/category.json");
                    var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

                    foreach (var category in categories!)
                    {
                        context.Categories!.Add(category);
                    }

                    await context.SaveChangesAsync();
                }

                if (context.Products!.Any())
                {
                    var productData = File.ReadAllText("../BusinessLogic/LoadData/product.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productData);

                    foreach (var product in products!)
                    {
                        context.Products!.Add(product);
                    }

                    await context.SaveChangesAsync();
                }

                /* if (!context.ShippingTypes.Any())
                {
                    var shippingTypeData = File.ReadAllText("../BusinessLogic/LoadData/shippingType.json");
                    var shippingTypes = JsonSerializer.Deserialize<List<ShippingType>>(shippingTypeData);

                    foreach (var shippingType in shippingTypes)
                    {
                        context.ShippingTypes.Add(shippingType);
                    }

                    await context.SaveChangesAsync();
                } */
            }
            catch (Exception exception)
            {
                var logger = loggerFactory.CreateLogger<MarketDbContextData>();

                logger.LogError(exception.Message);
            }
        }
    }
}