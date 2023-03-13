using System.Text.Json.Serialization;

namespace TheMealSpinner.Api.Models.DTOs;

public class RecipeTransfer
{
    public int Id { get; set; }
    [JsonPropertyName("title")]
    public string Title { get; set; }
    [JsonPropertyName("ingredients")]
    public List<string> Ingredients { get; set; }
    [JsonPropertyName("instructions")]
    public List<Instruction> Instructions { get; set; }
    [JsonPropertyName("times")]
    public List<string> Times { get; set; }
    [JsonPropertyName("image")]
    public string Image { get; set; }
}