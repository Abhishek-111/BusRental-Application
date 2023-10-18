using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class BusRentalContext : DbContext
    {
        public BusRentalContext(DbContextOptions<BusRentalContext> options) : base(options)
        {

        }

        public DbSet<BusDetails> BusDetails { get; set; }
        public DbSet<RentalAgreement> RentalAgreement { get; set; }
        public DbSet<User> User { get; set; }



    }
}
