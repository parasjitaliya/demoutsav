using storepay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace storepay.Utility
{
    public class HashGenerator
    {
        public static string SHA512HashGenerator(PaymentDetails paymentDetails, Customer customer)
        {
            string input = paymentDetails.Key + "|" + customer.PgtxnId + "|" + customer.Amount + "|" + customer.Productinfo
                + "|" + customer.FirstName + "|" + customer.Email + "|||||" + customer.UDF5 + "||||||" + paymentDetails.Salt;
            StringBuilder hash = new StringBuilder();
            SHA512 shaM = new SHA512Managed();
            byte[] bytes = shaM.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2").ToLower());
            }
            return hash.ToString();
        }

        public static string reverseHashGenerator(string udf5, string email, string fName, string productInfo, string amount, string pgTxnId, string salt, string key, PaymentResponse paymentResponse)
        {
            udf5 = null;
            string input = salt + "|" + paymentResponse.Status + "||||||" + udf5 + "|||||" + email
                + "|" + fName + "|" + productInfo + "|" + amount + "|" + pgTxnId + "|" + key;
            StringBuilder hash = new StringBuilder();
            SHA512 shaM = new SHA512Managed();
            byte[] bytes = shaM.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2").ToLower());
            }
            return hash.ToString();

        }
    }
}
