import React from 'react';
import TextField from '@material-ui/core/TextField';
// import $ from "jquery";
import { lock, norton, shopster, question, visa, master, pci, safe } from '../../assets/images';
import ProductHeader from '../Header/Header';
import { Spinner } from 'react-bootstrap';
import './upi.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

//import {GetHashValue} from '../../services/CustomerDetailsServices';

class Upi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
        upi: "",
        upiStatus: "",
        isVpavalid: 0,
        payerAccountName: "",
        showMessage: "",
        verifyLoader: false

    };
  }

    componentDidMount() {
    this.setState({
      loader: false
    });


  }
    upiHandler = (event) => {
        const upi = event.target.value;
        this.setState({
            upi: upi
        })
    }

    verifyBtnHandler = () => {
        let data = {
            ProgramCode: window.sessionStorage.getItem("programCode"),
            StoreCode: window.sessionStorage.getItem("storeCode"),
            Vpa : this.state.upi
        }
        this.setState({
            verifyLoader: true
        })
        console.log(process.env.REACT_APP_VerifyPayUUPIUrl);
        let url = process.env.REACT_APP_BASE_URL + "api/TxnDetail/verifyUpi";
        axios.post(url, data).then(res => {
            this.setState({
                verifyLoader: false
            })
            console.log(res.data);
            let content = JSON.parse(res.data.content);
            console.log(content);
            if (content.status.toLowerCase() === "success") {
                if (content.isVPAValid === 1) {
                    this.setState({
                        payerAccountName: content.payerAccountName,
                        showMessage: "Payer Account name is " + content.payerAccountName,
                        isVPAValid: content.isVPAValid
                    })
                }
                else {
                    this.setState({
                        showMessage: "Invalid UPI id, please check again"
                    })
                }
            }
            else {
                this.setState({
                    showMessage: "Invalid UPI id, please check again"
                })
            }
        })
        console.log(this.state.showMessage);
    }
    afterVerificationPayProcessHandler = (hash, key) => {
        
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let data = {
            hash: hash,
            var1: this.state.upi,
            command: "validateVPA",
            key: key

        }
        console.log(data);
        axios.post(process.env.REACT_APP_VerifyPayUUPIUrl, data, {
            headers: headers
        }).then(res=>{
            console.log(res.data);
        })
    }

    onMouseEnter = () => {
        alert("please enter your UPI id");
    }
 
  render() {
    const { loader } = this.state;
      const { txnDetails, pgType } = this.props;
      let actionUrl = process.env.REACT_APP_BASE_URL.toString() + "Payment/paymentProcess";
      let sfurl = process.env.REACT_APP_BASE_URL.toString() + "Payment/successProcess";
      const enabled = this.state.upi === ""; 
      const backUrl = '/?Token=' + txnDetails.uRLToken;
    return (
      <div className="mainContainer">
        {loader &&
          <div className="loader">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        }
        <ProductHeader />
        <div className='page_content'>
                <div className="card_detail_head">
                    <h4>UPI</h4>
                    <Link to={backUrl}>BACK</Link>
                </div>

                <form action={actionUrl} method="POST" > 
                    <div className="payment_option_upi">
                        <div className="input_group">
                            {this.state.verifyLoader &&
                                <div className="loader">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            }
                            <TextField id="upi-id" label="Enter Your UPI ID" name="vpa" value={this.state.upi} variant="outlined" onChange={this.upiHandler} />
                            <button type="button" onClick={this.verifyBtnHandler}>Verify</button>
                        </div>
                        {
                            this.state.showMessage === "" ? null : <p>{this.state.showMessage}</p>
                        }
                        
                    </div>
                    <input type="hidden" name="email" id="email" value={txnDetails.email} />
                    <input type="hidden" name="phone" id="phone" value={txnDetails.mobileNumber} />
                    <input type="hidden" name="productinfo" id="productinfo" value={txnDetails.productInfo} />
                    <input type="hidden" name="surl" id="surl" value={sfurl} />
                    <input type="hidden" name="furl" id="furl" value={sfurl} />
                    <input type="hidden" name="amount" id="amount" value={txnDetails.amount} />
                    <input type="hidden" name="firstName" id="firstName" value={txnDetails.fName} />
                    <input type="hidden" name="pg" id="pg" value={pgType} />
                    <input type="hidden" name="UDF5" id="UDF5" value="" />
                    <input type="hidden" name="bankCode" id="bankCode" value="" />
                    <input type="hidden" name="ccname" id="ccname" value="" />
                    <input type="hidden" name="ccnum" id="ccnum" value="" />
                    <input type="hidden" name="validthru" id="validthru" value="" />
                    <input type="hidden" name="ccvv" id="ccvv" value="" />
                    <input type="hidden" name="mercantTxnid" id="mercantTxnid" value={txnDetails.mercantTxnId} />
                    <input type="hidden" name="programCode" id="programCode" value={txnDetails.programCode} />
                    <input type="hidden" name="storeCode" id="storeCode" value={txnDetails.storeCode} />
                    <input type="hidden" name="terminalId" id="terminalId" value={txnDetails.terminalId} />
                    <input type="hidden" name="tokenId" id="tokenId" value={txnDetails.tokenId} />
                    <input type="hidden" name="PgtxnId" id="PgtxnId" value={txnDetails.PgtxnId} />
                    <input type="hidden" name="URLToken" id="URLToken" value={txnDetails.uRLToken} />

                    <div className="button_group" onMouseEnter={!enabled ? null : this.onMouseEnter}>
                        <button type="submit" disabled={enabled} className="pay" >PAY ₹ {txnDetails.amount}</button>
                    </div>
          </form> 
          <div className="payment_secure">
            <p>
              <img src={lock} alt="lock" />
          100% Secure Payments Powered by Easyrewardz
          </p>
            <div className="norton_img">
              <img src={norton} alt="norton" />
              <img src={visa} alt="visa" />
              <img src={master} alt="master" />
              <img src={pci} alt="pci" />
              <img src={safe} alt="safe" />
            </div>
          </div>
          <div className="payment_footer">
            <div className="shopster_img">
              <img src={shopster} alt="shopster" />
            </div>
            <div className="query_wrap">
              <p>For any Query, Contact Us :
              +91 847-000-3279
            help@shopster.live</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    txnDetails: state.transactionDetails,
    pgType: state.pgType
  };
}
export default connect(mapStateToProps)(Upi);