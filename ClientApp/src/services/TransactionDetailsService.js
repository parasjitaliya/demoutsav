import axios from 'axios';
export const getTransactionDetails = (tokenid,programCode) => {

    let result = encriptToken(tokenid);
    let transactionDetails = fetchTransactionDetails(programCode, tokenid);
    transactionDetails.then(res => {
        return res.data;
    })
}

const generateTxnId = () => {
    let min = 100;
    let max = 1000;
    let random = min + (Math.random() * (max - min));
    return Math.round(random);
}
const encriptToken = (URLToken) => {
    let programCode = "storepay";
    let tokenId = "001";
    return {
        programCode: programCode,
        tokenId: tokenId
    }
}
const fetchTransactionDetails = (programCode, tokenId) => {
    //api calling
    let data = {
        ProgramCode: programCode,
        TokenId: tokenId
    }
    
   return axios.post("https://localhost:44358/api/TxnDetail/getMerchantTxnDetails", data);
    //return {
    //    programCode: "storepay",
    //    programName : "Bataclub",
    //    tokenId: "10120489.6a0FRy5eNHYdSFzM9k6qPg==.1um9rmJHH2Xd0BvQBge8UpnkC12YoZc1lD//XFVtmAQ=",
    //    mercantTxnId: "TXN"+generateTxnId(),
    //    amount: "1200.00",
    //    storeCode: "SMB001",
    //    customerName : "shreyash",
    //    mobileNumber: "7000709194",
    //    email: "shre@gmail.com",
    //    terminalId: "TER0003",
    //    productInfo : "shoe",
    //    fName: "shre",

    //}
    }