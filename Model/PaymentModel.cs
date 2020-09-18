using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storepay.Model
{
    public class Customer
    {
        public string ProgramCode { get; set; }
        public string StoreCode { get; set; }
        public string Ccname { get; set; }
        public string Ccnum { get; set; }
        public string Validthru { get; set; }
        public string Ccexpmon { get; set; }
        public string Ccexpyr { get; set; }
        public string Ccvv { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Productinfo { get; set; }
        public string Surl { get; set; }
        public string Furl { get; set; }
        public string Amount { get; set; }
        public string FirstName { get; set; }
        public string Pg{ get; set; }
        public string BankCode { get; set; }
        public string Vpa { get; set; }
        public string MercantTxnid { get; set; }
        public string UDF5 { get; set; }
        public string TokenId { get; set; }
        public string URLToken { get; set; }
        public string TerminalId { get; set; }
        public string PgtxnId { get; set; }
        public string PaymentStatus { get; set; }
        public string RemainingAmount { get; set; }


    }

    public class PaymentDetails
    {
        public string Key { get; set; }
        public string Salt { get; set; }
        public string Hash { get; set; }
    }
    public class PaymentResponse
    {
        public string Status { get; set; }
        public string Firstname { get; set; }
        public string Amount { get; set; }
        public string Txnid { get; set; }
        public string Hash { get; set; }
        public string Productinfo { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string PayuMoneyId { get; set; }
        public string Mode { get; set; }
        public string PaymentId { get; set; }
        public string Mihpayid { get; set; }
        public string TxnMessage { get; set; }
        public string Error_Message { get; set; }

    }

    public class PaymentStatus
    {
        public string Email { get; set; }
        public string ProductInfo { get; set; }
        public string Amount { get; set; }
        public string FirstName { get; set; }
        public string MerchantTxnId { get; set; }
        public string Udf5 { get; set; }
        public string MerchantKey { get; set; }
        public string Salt { get; set; }
        public string ProgramCode { get; set; }
        public string TokenId { get; set; }
        public string PgtxnId { get; set; }
        public string URLToken { get; set; }



    }
    public class BankDetails
    {
        public string BankName { get; set; }
        public string BankCode { get; set; }
    }
    public class BankInputData
    {
        public string ProgramCode { get; set; }

    }

    public class UpiDetails
    {
        public string status { get; set; }
        public string vpa { get; set; }
        public string isVPAValid { get; set; }
        public string payerAccountName { get; set; }
        public Object Content { get; set; }
        //public string Hash { get; set; }
        //public string Key { get; set; }

    }
}
