using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Data
{
    public class AuthSpecificationEvaluator<T> where T : IdentityUser
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec)
        {
            if (spec.Criteria != null) inputQuery = inputQuery.Where(spec.Criteria);

            if (spec.OrderBy != null) inputQuery = inputQuery.OrderBy(spec.OrderBy);

            if (spec.OrderByDescending != null) inputQuery = inputQuery.OrderByDescending(spec.OrderByDescending);

            if (spec.IsPagingEnabled) inputQuery = inputQuery.Skip(spec.Skip).Take(spec.Take);

            inputQuery = spec.Includes.Aggregate(inputQuery, (current, include) => current.Include(include));

            return inputQuery;
        }
    }
}