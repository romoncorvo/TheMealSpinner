namespace TheMealSpinner.Api.Models.DTOs;

public class LoginResponse
{
    public User User { get; set; }
    public string Token { get; set; }
}