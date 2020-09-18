using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Logging;
using storepay.DataAccess;
using storepay.Model;
using storepay.Utility;

namespace storepay.Controllers
{
    //[ApiController]
    [Controller]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> _logger;
        private readonly PaymentDataAccess _paymentDataAccess;
        public string baseURL;
        public PaymentController(ILogger<PaymentController> logger,PaymentDataAccess paymentDataAccess)
        {
            _logger = logger;
            _paymentDataAccess = paymentDataAccess;
            baseURL = _paymentDataAccess.getBaseURL();
        }

        

         [HttpPost]
        [Route("paymentProcess")]
        public ContentResult paymentProcess(Customer data)
        {

            PaymentDetails paymentDetails = getPaymentCredentials(data.ProgramCode, data.StoreCode);
            paymentDetails.Hash = HashGenerator.SHA512HashGenerator(paymentDetails, data);
            string strForm = _paymentDataAccess.submitForm(data, paymentDetails);
            bool status = _paymentDataAccess.createTempSession(data, paymentDetails);
            bool txnStatus = _paymentDataAccess.createTransaction(data);
            //if (!txnStatus)
            //{
            //    //return Redirect(baseURL + "Error/?message= Oops! some error occured");
            //}
            _paymentDataAccess.updateTokenStatusOnCreateTxn(data.ProgramCode, data.TokenId, "InProgress");

            return new ContentResult
            {
                ContentType = "text/html",
                StatusCode = (int)HttpStatusCode.OK,
                Content = "<html><body>"+strForm+"</body></html>"
            };
        }

        [HttpPost]
        [Route("ServerCode")]
        public IActionResult getServerCode(string programCode)
        {
          string serverCode = _paymentDataAccess.getServerCode(programCode);
          return this.Ok(serverCode);
        }

        [HttpPost]
        [Route("getCredentials")]
        public PaymentDetails getPaymentCredentials(string programCode, string storeCode)
        {
            PaymentDetails paymentDetails = _paymentDataAccess.getPaymentCredentials(programCode, storeCode);
            return paymentDetails;
        }

        [HttpPost]
        [Route("successProcess")]
        public IActionResult successProcess(PaymentResponse paymentResponse)
        {
            PaymentStatus paymentStatus = _paymentDataAccess.getTempSessionStorage(paymentResponse.Txnid);
            string txnIdR = paymentStatus.PgtxnId;
            string billIdR = paymentStatus.MerchantTxnId;
            string amountR = paymentStatus.Amount;
            string paymentrefnoR = paymentResponse.PayuMoneyId != null ? paymentResponse.PayuMoneyId : paymentResponse.Mihpayid;
            string urlToken = paymentStatus.URLToken;
            string reverseHash = HashGenerator.reverseHashGenerator(paymentStatus.Udf5, paymentStatus.Email, paymentStatus.FirstName, paymentStatus.ProductInfo, paymentStatus.Amount, paymentStatus.PgtxnId, paymentStatus.Salt, paymentStatus.MerchantKey, paymentResponse);
            if (paymentResponse.Hash == reverseHash)
            {
                bool updateTxnStatus = _paymentDataAccess.updateTransactionStatus(paymentResponse, paymentStatus);

                if (paymentResponse.Status.ToString().ToLower() == "success")
                {
                    //string sample = baseURL + "Success/?txnId=" + txnIdR + "&paymentrefno=" + paymentrefnoR + "&billId=" + billIdR + "&amount=" + amountR;
                    //string encodedUrl = HttpUtility.UrlEncode(sample);
                    _paymentDataAccess.updateTokenStatus(paymentResponse, paymentStatus);
                    return Redirect(baseURL + "Success/?txnId=" + txnIdR + "&paymentrefno=" + paymentrefnoR + "&billId=" + billIdR + "&amount=" + amountR);
                }
                else
                {
                    _paymentDataAccess.updateTokenStatusOnCreateTxn(paymentStatus.ProgramCode, paymentStatus.TokenId, "Fail");
                    return Redirect(baseURL + "Failed/?urltoken=" + urlToken + "&txnId=" + txnIdR + "&paymentrefno=" + paymentrefnoR + "&billId=" + billIdR + "&amount=" + amountR);
                }
            }
            else
            {
                _paymentDataAccess.updateTokenStatusOnCreateTxn(paymentStatus.ProgramCode, paymentStatus.TokenId, "Fail");
                return Redirect(baseURL + "Failed/?urltoken=" + urlToken + "&txnId=" + txnIdR + "&paymentrefno=" + paymentrefnoR + "&billId=" + billIdR + "&amount=" + amountR);
            }
        
        }

    }

}
