using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class RentalDetails
    {
        public int AgreementId { get; set; }
        public int BusId { get; set; }
        public int UserId { get; set; }
        public string UserPhone { get; set; }
        public string UserName { get; set; }
        public string BusModel { get; set; }
        public string BusMaker { get; set; }
        public int RentalDuration { get; set; }
        public decimal TotalCost { get; set; }
        public bool RequestForReturn { get; set; }
        public bool ValidateReturnRequest { get; set; }
        public DateTime BookingDate { get; set; }
    }
}
