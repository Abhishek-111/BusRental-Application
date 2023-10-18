using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Modals
{
    public class BusModal
    {
        public int Id { get; set; }
        public string NumberPlate { get; set; }
        public string Maker { get; set; }
        public string Image { get; set; }
        public string Model { get; set; }
        public decimal RentalPrice { get; set; }
        public bool IsAvailable { get; set; }
        //public DateTime DateAdded { get; set; }
    }
}
