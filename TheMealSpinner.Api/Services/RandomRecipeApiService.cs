using System.Text.Json;
using TheMealSpinner.Api.Models.DTOs;

namespace TheMealSpinner.Api.Services
{
    public class RandomRecipeApiService : IRandomRecipeApiService
    {
        public async Task<RecipeTransfer> GetRecipeFromApi()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://random-recipes.p.rapidapi.com/ai-quotes/1"),
                Headers =
                {
                    { "X-RapidAPI-Key", "effba01cddmsh2cd8d9ac4709ce0p1e9a60jsnf9f11b09f0a1" },
                    { "X-RapidAPI-Host", "random-recipes.p.rapidapi.com" },
                },
            };

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStreamAsync();
                return (await JsonSerializer.DeserializeAsync<List<RecipeTransfer>>(body)).FirstOrDefault();
            }
        }
    }
}