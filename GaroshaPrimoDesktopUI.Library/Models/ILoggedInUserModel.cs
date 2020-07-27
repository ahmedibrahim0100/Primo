using System;

namespace GaroshaPrimoDesktopUI.Library.Models
{
    public interface ILoggedInUserModel
    {
        DateTime CreatedDate { get; set; }
        string Email { get; set; }
        string Id { get; set; }
        string Name { get; set; }
        string Status { get; set; }
        string Token { get; set; }
    }
}