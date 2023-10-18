using BusinessLogicLayer.Modals;
using DataAccessLayer.Data;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.UserServices
{

    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepository = null;

        public UserManager(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserDetail(LoginCredentials credentials)
        {
            var user = await _userRepository.GetUserDetail(credentials.Email, credentials.Password);
            return user;
        }
    }
}
