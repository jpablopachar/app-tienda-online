using AutoMapper;
using Core.Entities;

namespace WebApi.Dtos
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(product => product.CategoryName, options => options.MapFrom(product => product.Category!.Name))
                .ForMember(product => product.BrandName, options => options.MapFrom(product => product.Brand!.Name));

            /* CreateMap<Core.Entities.Address, AddressDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<AddressDto, Core.Entities.PurchaseOrder.Address>().ReverseMap();

            CreateMap<PurchaseOrders, PurchaseOrderResponseDto>().ForMember(o => o.ShippingType, x => x.MapFrom(y => y.ShippingType.Name)).ForMember(o => o.ShippingTypePrice, x => x.MapFrom(y => y.ShippingType.Price));

            CreateMap<OrderItem, OrderItemResponseDto>().ForMember(o => o.ProductId, x => x.MapFrom(y => y.ItemOrdered.ProductItemId)).ForMember(o => o.ProductName, x => x.MapFrom(y => y.ItemOrdered.ProductName)).ForMember(o => o.ProductImage, x => x.MapFrom(y => y.ItemOrdered.ImageUrl)); */
        }
    }
}