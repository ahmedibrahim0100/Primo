using System.Threading.Tasks;
using GaroshaPrimoDesktopUI.Library.Models;

namespace GaroshaPrimoDesktopUI.Library.API
{
    public interface IAPIHelper
    {
        Task<AuthenticatedUser> Authenticate(string username, string password);
        Task GetLoggedInUserInfo(string token);
        void InitializeClient();
    }
}