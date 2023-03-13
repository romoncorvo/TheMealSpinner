namespace TheMealSpinner.Api.Repository.IRepository;

public interface IRepositories
{
    IRecipeRepository Recipe { get; }
    IUserRepository User { get; }
    Task Save();
}