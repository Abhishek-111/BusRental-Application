using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class UserRentalAgreement
    {
        //public string UserName { get; set; }
        //public string Email { get; set; }
        //public string Phone { get; set; }
        public int BusId { get; set; }
        public string Model { get; set; }
        public string Maker { get; set; }
        public int RentalDuration { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime AgreementDate { get; set; }

    }
}
