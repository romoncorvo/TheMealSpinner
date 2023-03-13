using Microsoft.EntityFrameworkCore;
using TheMealSpinner.Api.Models;

namespace TheMealSpinner.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<User> Users { get; set; }

}