using System.Linq.Expressions;

namespace TheMealSpinner.Api.Repository.IRepository;

public interface IGenericRepositoryAsync<T> where T : class
{
    Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);
    Task<T> GetByIdAsync(int id);
    Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter);
    Task<T> AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
}