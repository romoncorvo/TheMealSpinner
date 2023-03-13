using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using TheMealSpinner.Api.Models.DTOs;

namespace TheMealSpinner.Api.Models;
[Table("Recipes")]
public class Recipe
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Ingredients { get; set; }
    [Required]
    public string Instructions { get; set; }
    public string Times { get; set; }
    [Required]
    public string Image { get; set; }
    [ForeignKey("User")]
    [Required]
    public int UserId { get; set; }
    [ValidateNever]
    [JsonIgnore]
    public User User { get; set; }
    public string? Rating { get; set; }
    public string? Comment { get; set; }
}