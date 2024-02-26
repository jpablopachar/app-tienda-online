using Core.Entities;

namespace Core.Specifications.Users
{
    public class UserSpecification : Specification<User>
    {
        public UserSpecification(UserSpecificationParams userParams) : base(user =>
        (string.IsNullOrEmpty(userParams.Search) || user.Name!.Contains(userParams.Search)) &&
        (string.IsNullOrEmpty(userParams.Name) || user.Name!.Contains(userParams.Name)) &&
        (string.IsNullOrEmpty(userParams.LastName) || user.LastName!.Contains(userParams.LastName)))
        {
            ApplyPaging(userParams.PageSize * (userParams.PageIndex - 1), userParams.PageSize);

            if (!string.IsNullOrEmpty(userParams.Sort))
            {
                switch (userParams.Sort)
                {
                    case "nameAsc":
                        AddOrderBy(user => user.Name!);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(user => user.Name!);
                        break;
                    case "emailAsc":
                        AddOrderBy(user => user.Email!);
                        break;
                    case "emailDesc":
                        AddOrderByDescending(user => user.Email!);
                        break;
                    default:
                        AddOrderBy(user => user.Name!);
                        break;
                }
            }
        }
    }
}