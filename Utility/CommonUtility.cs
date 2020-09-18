using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storepay.Utility
{
    public class CommonUtility
    {
        public static String[] splitMonthYear(string sample)
        {
            String[] strlist = sample.Split('/',2,
            StringSplitOptions.RemoveEmptyEntries);
            return strlist;
        }

       
    }


}
