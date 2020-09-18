using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using RestSharp;
using storepay.Model;
using storepay.Utility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace storepay.DataAccess
{
    public class PaymentDataAccess 
    {
        private readonly DBSettings _dBSettings;

        public PaymentDataAccess(IOptions<DBSettings> dBSettings)
        {
            _dBSettings = dBSettings.Value;
        }
        public string GetHashValue(Customer customer)
        {
            PaymentDetails paymentDetails = new PaymentDetails();
            paymentDetails.Key = "ByHHYj8a";
            paymentDetails.Salt = "udsV4F0Q5D";
            string hashValue = HashGenerator.SHA512HashGenerator(paymentDetails, customer);
            return hashValue;
        }

        public string getServerCode(string programCode)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            string serverCode = string.Empty;
            try
            {
                objConnection = new MySqlConnection(_dBSettings.MasterConnectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("GETPROGRAMSERVERCODE", objConnection);
                objCommand.Parameters.AddWithValue("?ProgramCode", programCode);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            serverCode = objReader["ProgramServerCode"] != DBNull.Value ? Convert.ToString(objReader["ProgramServerCode"]) : string.Empty;
                        }
                    }

                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            objConnection.Close();
            return serverCode;
        }

        public PaymentDetails getPaymentCredentials(string programCode,string storeCode)
        {
            
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            PaymentDetails paymentDetails = new PaymentDetails();
            try
            {
               string connectionString = getObjConnection(programCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_GetPaymentCredentials", objConnection);
                objCommand.Parameters.AddWithValue("?p_programCode", programCode);
                objCommand.Parameters.AddWithValue("?p_storeCode", storeCode);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            paymentDetails.Key = "gtKFFx";
                            paymentDetails.Salt = "eCwWELxi";
                        }
                    }

                }
                paymentDetails.Key = "gtKFFx";
                paymentDetails.Salt = "eCwWELxi";
                objConnection.Close();
                return paymentDetails;
            }
            catch (Exception)
            {
                throw;
                
            }
        }

        public string getObjConnection(string programCode)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            string serverCode = string.Empty;
            string connectionString = string.Empty;
            try
            {
                objConnection = new MySqlConnection(_dBSettings.MasterConnectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("SP_storepay_validateProgramCode", objConnection);
                objCommand.Parameters.AddWithValue("?Program_code", programCode);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            connectionString = objReader["ConnectionString"] != DBNull.Value ? Convert.ToString(objReader["ConnectionString"]) : string.Empty;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            objConnection.Close();
            return connectionString;
        }

        public bool createTempSession(Customer customer,PaymentDetails paymentDetails)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            string serverCode = string.Empty;
            string connectionString = string.Empty;
            try
            {
                objConnection = new MySqlConnection(_dBSettings.MasterConnectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_InsertTransactionLog", objConnection);
                objCommand.Parameters.AddWithValue("?p_merchantTransactionId", customer.MercantTxnid);
                objCommand.Parameters.AddWithValue("?p_FName", customer.FirstName != null ? customer.FirstName : "storepay");
                objCommand.Parameters.AddWithValue("?p_Email", customer.Email != null ? customer.Email : "storepay@easyrewardz.com");
                objCommand.Parameters.AddWithValue("?p_UDF5", customer.UDF5 != null ? customer.UDF5 : "" );
                objCommand.Parameters.AddWithValue("?p_ProductInfo", customer.Productinfo);
                objCommand.Parameters.AddWithValue("?p_Amount", customer.Amount);
                objCommand.Parameters.AddWithValue("?p_MerchantKey", paymentDetails.Key);
                objCommand.Parameters.AddWithValue("?p_Salt", paymentDetails.Salt);
                objCommand.Parameters.AddWithValue("?programCode", customer.ProgramCode);
                objCommand.Parameters.AddWithValue("?TokenId", customer.TokenId);
                objCommand.Parameters.AddWithValue("?PgTxnID", customer.PgtxnId);
                objCommand.Parameters.AddWithValue("?UrlToken", customer.URLToken);
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.ExecuteNonQuery();
                objConnection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public PaymentStatus getTempSessionStorage(string merchantTxnId)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            string serverCode = string.Empty;
            string connectionString = string.Empty;
            try
            {
                PaymentStatus paymentStatus = new PaymentStatus();
                objConnection = new MySqlConnection(_dBSettings.MasterConnectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("getTempSessionStorage", objConnection);
                objCommand.Parameters.AddWithValue("?pCode", merchantTxnId);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            paymentStatus.Amount = objReader["Amount"] != DBNull.Value ? Convert.ToString(objReader["Amount"]) : string.Empty;
                            paymentStatus.FirstName = objReader["FirstName"] != DBNull.Value ? Convert.ToString(objReader["FirstName"]) : string.Empty;
                            paymentStatus.Email = objReader["Email"] != DBNull.Value ? Convert.ToString(objReader["Email"]) : string.Empty;
                            paymentStatus.MerchantTxnId = objReader["MerchantTxnId"] != DBNull.Value ? Convert.ToString(objReader["MerchantTxnId"]) : string.Empty;
                            paymentStatus.Udf5 = objReader["Udf5"] != DBNull.Value ? Convert.ToString(objReader["Udf5"]) : string.Empty;
                            paymentStatus.ProductInfo = objReader["ProductInfo"] != DBNull.Value ? Convert.ToString(objReader["ProductInfo"]) : string.Empty;
                            paymentStatus.Salt = objReader["Salt"] != DBNull.Value ? Convert.ToString(objReader["Salt"]) : string.Empty;
                            paymentStatus.MerchantKey = objReader["MerchantKey"] != DBNull.Value ? Convert.ToString(objReader["MerchantKey"]) : string.Empty;
                            paymentStatus.ProgramCode = objReader["ProgramCode"] != DBNull.Value ? Convert.ToString(objReader["ProgramCode"]) : string.Empty;
                            paymentStatus.TokenId = objReader["TokenId"] != DBNull.Value ? Convert.ToString(objReader["TokenId"]) : string.Empty;
                            paymentStatus.PgtxnId = objReader["PgTxnId"] != DBNull.Value ? Convert.ToString(objReader["PgTxnId"]) : string.Empty;
                            paymentStatus.URLToken = objReader["UrlToken"] != DBNull.Value ? Convert.ToString(objReader["UrlToken"]) : string.Empty;

                        }
                    }

                }
                objConnection.Close();
                return paymentStatus;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool createTransaction(Customer customer)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            try
            {
                string connectionString = getObjConnection(customer.ProgramCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_createPaymentTransaction", objConnection);
                objCommand.Parameters.AddWithValue("?MerchantTxnId", customer.MercantTxnid);
                objCommand.Parameters.AddWithValue("?TokenId",customer.TokenId );
                objCommand.Parameters.AddWithValue("?TerminalId", customer.TerminalId !=null ? customer.TerminalId :"Storepay-Ter-001");
                objCommand.Parameters.AddWithValue("?BillId", customer.MercantTxnid);
                objCommand.Parameters.AddWithValue("?URLToken", customer.URLToken != null ? customer.URLToken : string.Empty);
                objCommand.Parameters.AddWithValue("?Mobile", customer.Phone);
                objCommand.Parameters.AddWithValue("?Email", customer.Email !=null ? customer.Email : "storepay@easyrewardz.com");
                objCommand.Parameters.AddWithValue("?Amount", customer.Amount);
                objCommand.Parameters.AddWithValue("?PaymentMode", customer.Pg);
                objCommand.Parameters.AddWithValue("?p_Status", "Processing");
                objCommand.Parameters.AddWithValue("?PgtxnID", customer.PgtxnId);

                objCommand.CommandType = CommandType.StoredProcedure;
               var result = objCommand.ExecuteNonQuery();
                objConnection.Close();
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }

        public bool updateTransactionStatus(PaymentResponse paymentResponse,PaymentStatus paymentStatus)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            try
            {
                string connectionString = getObjConnection(paymentStatus.ProgramCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_updatePaymentTransaction", objConnection);
                objCommand.Parameters.AddWithValue("?PgtxnId", paymentResponse.Txnid);
                objCommand.Parameters.AddWithValue("?TokenId", paymentStatus.TokenId);
                objCommand.Parameters.AddWithValue("?PaymentRefNo", paymentResponse.PaymentId !=null ? paymentResponse.PaymentId : paymentResponse.Mihpayid !=null ? paymentResponse.Mihpayid : string.Empty);
                if(paymentResponse.Status.ToLower() == "success")
                {
                    objCommand.Parameters.AddWithValue("?p_Status", "Success");

                }
                else if (paymentResponse.Status.ToLower() == "pending")
                    {
                        objCommand.Parameters.AddWithValue("?p_Status", "Pending");

                    }
                else if (paymentResponse.Status.ToLower() == "failed")
                {
                    objCommand.Parameters.AddWithValue("?p_Status", "Failed");

                }
                else if (paymentResponse.Status.ToLower() == "")
                {
                    objCommand.Parameters.AddWithValue("?p_Status", "");

                }
                else
                {
                    objCommand.Parameters.AddWithValue("?p_Status","null");

                }
                objCommand.Parameters.AddWithValue("?PaymentMessage", paymentResponse.TxnMessage != null ? paymentResponse.TxnMessage : "Payment done");
                objCommand.Parameters.AddWithValue("?PgStatus",paymentResponse.Status);
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.ExecuteNonQuery();
                objConnection.Close();    
                return true;
                }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }


        public bool updateTokenStatus(PaymentResponse paymentResponse, PaymentStatus paymentStatus)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            try
            {
                string connectionString = getObjConnection(paymentStatus.ProgramCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_updateTokenStatus", objConnection);
                objCommand.Parameters.AddWithValue("?TokenId", paymentStatus.TokenId);
                objCommand.Parameters.AddWithValue("?p_Status", "Success");
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.ExecuteNonQuery();
                objConnection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }

        private string PreparePOSTForm(string url, System.Collections.Hashtable data) // post form
        {
            //Set a name for the form
            string formID = "PostForm";
            //Build the form using the specified data to be posted.
            StringBuilder strForm = new StringBuilder();
            strForm.Append("<form id=\"" + formID + "\" name=\"" +
                           formID + "\" action=\"" + url +
                           "\" method=\"POST\">");

            foreach (System.Collections.DictionaryEntry key in data)
            {

                strForm.Append("<input type=\"hidden\" name=\"" + key.Key +
                               "\" value=\"" + key.Value + "\">");
            }

            strForm.Append("</form>");
            //Build the JavaScript which will do the Posting operation.
            StringBuilder strScript = new StringBuilder();
            strScript.Append("<script language='javascript'>");
            strScript.Append("var v" + formID + " = document." +
                             formID + ";");
            strScript.Append("v" + formID + ".submit();");
            strScript.Append("</script>");
            //Return the form and the script concatenated.
            //(The order is important, Form then JavaScript)
            return strForm.ToString() + strScript.ToString();
        }

        public string submitForm(Customer customer, PaymentDetails paymentDetails)
        {
            string baseURL = getBaseURL();
            if(customer.Validthru ==null)
            {
                customer.Ccexpmon = "";
                customer.Ccexpyr = "";
            }
            else
            {
                string[] str = CommonUtility.splitMonthYear(customer.Validthru);
                customer.Ccexpmon = str[0];
                customer.Ccexpyr = str[1];
            }
            
            System.Collections.Hashtable data = new System.Collections.Hashtable();
            data.Add("hash", paymentDetails.Hash);
            data.Add("txnid", customer.PgtxnId);
            data.Add("key", paymentDetails.Key);
            data.Add("amount", customer.Amount);
            data.Add("firstname", customer.FirstName != null ? customer.FirstName : "storepay");
            data.Add("email", customer.Email != null ? customer.Email : "storepay@easyrewardz.com");
            data.Add("phone", customer.Phone);
            data.Add("productinfo", customer.Productinfo);
            data.Add("surl", baseURL+ "Payment/successProcess");
            data.Add("furl", baseURL + "Payment/successProcess");
            data.Add("lastname", "");
            data.Add("address1", "");
            data.Add("city", "");
            data.Add("state", "");
            data.Add("country", "");
            data.Add("zipcode", "");
            data.Add("udf5", customer.UDF5);
            data.Add("pg", customer.Pg);
            data.Add("bankcode", customer.BankCode);
            data.Add("ccnum", customer.Ccnum);
            data.Add("ccname", customer.Ccname);
            data.Add("ccvv", customer.Ccvv);
            data.Add("ccexpmon", customer.Ccexpmon);
            data.Add("ccexpyr", customer.Ccexpyr);
            data.Add("vpa", customer.Vpa);
            string strForm = PreparePOSTForm(_dBSettings.PayUUrl, data);
            return strForm;
        }
       public string getBaseURL()
        {
            return _dBSettings.URL;
        }

        public Customer getMerchantTxnDetails(Customer customer)
        {
            Customer data = new Customer();
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            try
            {
                string connectionString = getObjConnection(customer.ProgramCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_cGetMerchantTxnDetails_new", objConnection);
                objCommand.Parameters.AddWithValue("?tokenid", customer.TokenId);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            data.ProgramCode = objReader["programCode"] != DBNull.Value ? Convert.ToString(objReader["programCode"]) : string.Empty;
                            data.StoreCode = objReader["storeCode"] != DBNull.Value ? Convert.ToString(objReader["storeCode"]) : string.Empty;
                            data.TerminalId = objReader["terminalId"] != DBNull.Value ? Convert.ToString(objReader["terminalId"]) : string.Empty;
                            data.MercantTxnid = objReader["merchantTxnID"] != DBNull.Value ? Convert.ToString(objReader["merchantTxnID"]) : string.Empty;
                            data.FirstName = objReader["name"] != DBNull.Value ? Convert.ToString(objReader["name"]) != "" ? Convert.ToString(objReader["name"]):"storepay" : "storepay";
                            data.Phone = objReader["mobile"] != DBNull.Value ? Convert.ToString(objReader["mobile"]) : string.Empty;
                            data.Email = objReader["email"] != DBNull.Value ? Convert.ToString(objReader["email"])!="" ? Convert.ToString(objReader["email"]): "storepay@easyrewardz.com" : "storepay@easyrewardz.com";
                            data.TokenId = objReader["tokenId"] != DBNull.Value ? Convert.ToString(objReader["tokenId"]) : string.Empty;
                            data.Amount = objReader["amount"] != DBNull.Value ? Convert.ToString(objReader["amount"]) : string.Empty;
                            data.PaymentStatus = objReader["PaymentStatus"] != DBNull.Value ? Convert.ToString(objReader["PaymentStatus"]) : string.Empty;
                            data.RemainingAmount = objReader["RemainingAmount"] != DBNull.Value ? Convert.ToString(objReader["RemainingAmount"]) : string.Empty;

                        }
                    }

                }
                objConnection.Close();
                return data;
            }
            catch (Exception)
            {
                throw;

            }
        }

        public bool updateTokenStatusOnCreateTxn(string programCode,string tokenId,string status)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            try
            {
                string connectionString = getObjConnection(programCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_updateTokenStatus", objConnection);
                objCommand.Parameters.AddWithValue("?TokenId", tokenId);
                objCommand.Parameters.AddWithValue("?p_Status", status);
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.ExecuteNonQuery();
                objConnection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

       public List<BankDetails> getBankDetails(string programCode)
        {
            MySqlConnection objConnection = null;
            MySqlCommand objCommand = null;
            List<BankDetails> banks = new List<BankDetails>();
            try
            {
                BankDetails bankDetails = new BankDetails();
                string connectionString = getObjConnection(programCode);
                objConnection = new MySqlConnection(connectionString);
                if (objConnection.State != ConnectionState.Open)
                {
                    objConnection.Open();
                }
                objCommand = new MySqlCommand("sp_GetBankDetails", objConnection);
                objCommand.CommandType = CommandType.StoredProcedure;
                using (DbDataReader objReader = objCommand.ExecuteReader())
                {
                    if (objReader.HasRows)
                    {
                        while (objReader.Read())
                        {
                            banks.Add(new BankDetails()
                            {
                                BankName = objReader["BankName"] != DBNull.Value ? Convert.ToString(objReader["BankName"]) : string.Empty,
                                BankCode = objReader["BankCode"] != DBNull.Value ? Convert.ToString(objReader["BankCode"]) : string.Empty

                            });
                        }
                    }
                }
                objConnection.Close();
                return banks;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
                //return false;
            }

        }

        public string verifyUpi(string programcode , string storecode,string vpa)
        {
            UpiDetails upiDetails = new UpiDetails();
            PaymentDetails paymentDetails = new PaymentDetails();
            paymentDetails = getPaymentCredentials(programcode, storecode);
            string salt = paymentDetails.Salt;
            string key = paymentDetails.Key;
            string command = "validateVPA";
            string input = key + "|" + command + "|" + vpa + "|" + salt;
            string hash = upiHashGenerator(input);
            //var client = new RestClient(_dBSettings.VerifyPayUUPIUrl);
            //var request = new RestRequest(Method.POST);
            ////request.AddHeader("postman-token", "148c2dfd-da5a-822d-b5ca-d37b62c7d1b6");
            ////request.AddHeader("cache-control", "no-cache");
            //request.AddHeader("content-type", "application/x-www-form-urlencoded");
            //request.AddParameter("application/x-www-form-urlencoded", "key="+key+"&command=validateVPA&var1="+vpa+"&hash="+hash,ParameterType.RequestBody);
            //IRestResponse response = client.Execute(request);
            //upiDetails.Content = response.Content;
            return hash;
        }
        public string upiHashGenerator(string input)
        {
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
