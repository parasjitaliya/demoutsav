using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RestSharp;
using storepay.DataAccess;
using storepay.Model;

namespace storepay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TxnDetailController : ControllerBase
    {
        private readonly DBSettings _dBSettings;
        private readonly ILogger<TxnDetailController> _logger;
        private readonly PaymentDataAccess _paymentDataAccess;
        public string baseURL;
        public TxnDetailController(ILogger<TxnDetailController> logger, PaymentDataAccess paymentDataAccess, IOptions<DBSettings> dBSettings)
        {
            _logger = logger;
            _paymentDataAccess = paymentDataAccess;
            baseURL = _paymentDataAccess.getBaseURL();
            _dBSettings = dBSettings.Value;
        }
        [HttpPost]
        [Route("getMerchantTxnDetails")]
        public IActionResult getMerchantTxnDetails(Customer customer)
        {
            return this.Ok(_paymentDataAccess.getMerchantTxnDetails(customer));
        }

        [HttpPost]
        [Route("updateTokenStatusOnPicked")]
        public IActionResult updateTokenStatusOnPicked(Customer customer)
        {
            return this.Ok(_paymentDataAccess.updateTokenStatusOnCreateTxn(customer.ProgramCode, customer.TokenId, "Picked"));
        }

        [HttpPost]
        [Route("getBankDetails")]
        public IActionResult getBankDetails(BankInputData bankInputData)
        {
            return this.Ok(_paymentDataAccess.getBankDetails(bankInputData.ProgramCode));
        }
        [HttpPost]
        [Route("verifyUpi")]
        public IActionResult verifyUpi(Customer customer)
        {
            UpiDetails upiDetails = new UpiDetails();
            PaymentDetails paymentDetails = new PaymentDetails();
            paymentDetails = _paymentDataAccess.getPaymentCredentials(customer.ProgramCode, customer.StoreCode);
            string salt = paymentDetails.Salt;
            string key = paymentDetails.Key;
            string command = "validateVPA";
            string input = key + "|" + command + "|" + customer.Vpa + "|" + salt;
            string hash = _paymentDataAccess.upiHashGenerator(input);
            var client = new RestClient(_dBSettings.VerifyPayUUPIUrl);
            var request = new RestRequest(Method.POST);
            request.AddHeader("postman-token", "148c2dfd-da5a-822d-b5ca-d37b62c7d1b6");
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", "key=" + key + "&command=validateVPA&var1=" + customer.Vpa + "&hash=" + hash, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            upiDetails.Content = response.Content;
            return this.Ok(upiDetails);
        }


    }
}