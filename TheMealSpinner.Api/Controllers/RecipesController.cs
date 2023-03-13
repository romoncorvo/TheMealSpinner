using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheMealSpinner.Api.Data;
using TheMealSpinner.Api.Models;
using TheMealSpinner.Api.Models.DTOs;
using TheMealSpinner.Api.Repository.IRepository;
using TheMealSpinner.Api.Services;

namespace TheMealSpinner.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRepositories _repositories;
        private readonly IRandomRecipeApiService _randomRecipeApiService;
        private readonly IMapper _mapper;

        public RecipesController(ApplicationDbContext context, IRepositories repositories, IRandomRecipeApiService randomRecipeApiService, IMapper mapper)
        {
            _repositories = repositories;
            _randomRecipeApiService = randomRecipeApiService;
            _mapper = mapper;
        }
        
        [HttpGet("new")]
        public async Task<ActionResult<RecipeTransfer>> GetNewRecipe()
        {
            if (_repositories.Recipe == null)
            {
                return NotFound();
            }

            return await _randomRecipeApiService.GetRecipeFromApi();
        }
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            if (_repositories.Recipe == null)
            {
                return NotFound();
            }

            return await _repositories.Recipe.GetAllAsync();
        }
        
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Recipe>> PostRecipe(RecipeTransfer newRecipe)
        {
            if (_repositories.Recipe == null)
            {
                return Problem("Entity set 'RecipeContext.Recipe'  is null.");
            }
            
            var recipe = _mapper.Map<Recipe>(newRecipe);
            recipe.Id = 0;
        
            await _repositories.Recipe.AddAsync(recipe);
            await _repositories.Save();
        
            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeTransfer>> GetRecipe(int id)
        {
            if (_repositories.Recipe == null)
            {
                return NotFound();
            }
        
            var recipe = await _repositories.Recipe.GetFirstOrDefaultAsync(c => c.Id == id);
        
            if (recipe == null)
            {
                return NotFound();
            }
        
            return _mapper.Map<RecipeTransfer>(recipe);
        }
        
        
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutRecipe(int id, [FromBody] RecipeTransfer updatedRecipe)
        {
            if (id != updatedRecipe.Id)
            {
                return BadRequest();
            }
            var recipe = _mapper.Map<Recipe>(updatedRecipe);
        
            try
            {
                _repositories.Recipe.Update(recipe);
                await _repositories.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        
            return NoContent();
        }
        
        
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            if (_repositories.Recipe == null)
            {
                return NotFound();
            }
        
            var recipe = await _repositories.Recipe.GetFirstOrDefaultAsync(r => r.Id == id);
            if (recipe == null)
            {
                return NotFound();
            }
        
            _repositories.Recipe.Delete(recipe);
            await _repositories.Save();
        
            return NoContent();
        }
        
    }
}