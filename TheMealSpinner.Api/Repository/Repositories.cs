using TheMealSpinner.Api.Data;
using TheMealSpinner.Api.Repository.IRepository;

namespace TheMealSpinner.Api.Repository;

public class Repositories : IRepositories
{
    private ApplicationDbContext _db;
    public IRecipeRepository Recipe { get; }
    public IUserRepository User { get; }
    
    public Repositories(ApplicationDbContext db, IConfiguration configuration)
    {
        _db = db;
        User = new UserRepository(_db, configuration);
        Recipe = new RecipeRepository(_db);
    }
    public async Task Save()
    {
        await _db.SaveChangesAsync();
    }
}