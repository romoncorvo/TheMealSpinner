using TheMealSpinner.Api.Models;
using TheMealSpinner.Api.Models.DTOs;

namespace TheMealSpinner.Api.Repository.IRepository;

public interface IUserRepository : IGenericRepositoryAsync<User>
{
    bool IsUniqueUser(string userName);
    Task<LoginResponse> Login(LoginRequest loginRequest);
    Task<User> Register(RegistrationRequest registrationRequest);
}