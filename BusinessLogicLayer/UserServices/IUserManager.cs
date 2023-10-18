using BusinessLogicLayer.Modals;
using DataAccessLayer.Data;
using System.Threading.Tasks;

namespace BusinessLogicLayer.UserServices
{
    public interface IUserManager
    {
        Task<User> GetUserDetail(LoginCredentials credentials);
    }
}