using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storepay.Model
{
    public class DBSettings
    {
        public string MasterConnectionString { get; set; }
        public string StorePayConnectionString { get; set; }
        public string S2{ get; set; }
        public string IsDestination { get; set; }
        public string URL { get; set; }
        public string PayUUrl { get; set; }
        public string VerifyPayUUPIUrl { get; set; }
    }
}
