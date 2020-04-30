using System.Threading.Tasks;
using GaroshaPrimoDesktopUI.Models;

namespace GaroshaPrimoDesktopUI.Helpers
{
    public interface IAPIHelper
    {
        Task<AuthenticatedUser> Authenticate(string username, string password);
        void InitializeClient();
    }
}