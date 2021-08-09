using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class VendorDBModel
    {
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public decimal VendorBalance { get; set; }
        public string VendorStatus { get; set; }
    }
}
