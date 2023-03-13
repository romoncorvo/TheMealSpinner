using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TheMealSpinner.Api.Data;
using TheMealSpinner.Api.Repository.IRepository;

namespace TheMealSpinner.Api.Repository;

public class GenericRepositoryAsync<T> : IGenericRepositoryAsync<T> where T : class
{
    private readonly ApplicationDbContext _db;
    internal readonly DbSet<T> DbSet;

    public GenericRepositoryAsync(ApplicationDbContext db)
    {
        _db = db;
        this.DbSet = _db.Set<T>();
    }
    public virtual async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = DbSet;
        
        if (filter != null)
        {
            query = DbSet.Where(filter);
        }
        
        return await query.ToListAsync();
    }
    
    public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter)
    {
        IQueryable<T> query = DbSet;

        query = query.Where(filter);

        return await query.FirstOrDefaultAsync();
    }

    public virtual async Task<T> GetByIdAsync(int id)
    {
        return await DbSet.FindAsync(id);
    }

    public async Task<T> AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        return entity;
    }

    public void Update(T entity)
    {
        _db.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
        DbSet.Remove(entity);
    }
}