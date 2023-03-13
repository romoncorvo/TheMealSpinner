using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TheMealSpinner.Api.Data;
using TheMealSpinner.Api.Models;
using TheMealSpinner.Api.Repository.IRepository;

namespace TheMealSpinner.Api.Repository;

public class RecipeRepository : GenericRepositoryAsync<Recipe>, IRecipeRepository
{
    private readonly ApplicationDbContext _db;

    public RecipeRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}