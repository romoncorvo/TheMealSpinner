using TheMealSpinner.Api.Models.DTOs;

namespace TheMealSpinner.Api.Services
{
  public interface IRandomRecipeApiService
  {
    Task<RecipeTransfer> GetRecipeFromApi();
  }
}
