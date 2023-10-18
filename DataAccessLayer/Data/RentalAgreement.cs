using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class RentalAgreement
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VehicleId { get; set; } // recently added
        public int RentalDuration { get; set; }
        public decimal TotalCost { get; set; }
        public bool RequestForReturn { get; set; }
        public bool ValidateReturnRequest { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
