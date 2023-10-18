using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly BusRentalContext _context = null;
        public UserRepository(BusRentalContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserDetail(string email, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
            return user;
        }
    }
}
