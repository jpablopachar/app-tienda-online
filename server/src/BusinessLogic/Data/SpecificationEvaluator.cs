using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : Base
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> specification)
        {
            if (specification.Criteria != null)
            {
                inputQuery = inputQuery.Where(specification.Criteria);
            }

            if (specification.OrderBy != null)
            {
                inputQuery = inputQuery.OrderBy(specification.OrderBy);
            }

            if (specification.OrderByDescending != null)
            {
                inputQuery = inputQuery.OrderByDescending(specification.OrderByDescending);
            }

            if (specification.IsPagingEnabled)
            {
                inputQuery = inputQuery.Skip(specification.Skip).Take(specification.Take);
            }

            inputQuery = specification.Includes.Aggregate(inputQuery, (current, include) => current.Include(include));

            return inputQuery;
        }
    }
}