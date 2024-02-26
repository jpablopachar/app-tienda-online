using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class AddressDto
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Department { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
    }
}