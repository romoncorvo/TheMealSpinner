using System.Text.Json.Serialization;

namespace TheMealSpinner.Api.Models.DTOs;

public class Instruction
{
    [JsonPropertyName("text")]
    public string Text { get; set; }
}