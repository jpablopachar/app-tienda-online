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

            CreateMap<Address, AddressDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}