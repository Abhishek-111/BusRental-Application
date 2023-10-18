using DataAccessLayer.Data;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserDetail(string email, string password);
    }
}