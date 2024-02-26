using Core.Entities;

namespace Core.Specifications.Users
{
    public class UserForCountingSpecification(UserSpecificationParams userParams) : Specification<User>(user =>
        (string.IsNullOrEmpty(userParams.Search) || user.Name!.Contains(userParams.Search)) &&
        (string.IsNullOrEmpty(userParams.Name) || user.Name!.Contains(userParams.Name)) &&
        (string.IsNullOrEmpty(userParams.LastName) || user.LastName!.Contains(userParams.LastName)))
    { }
}