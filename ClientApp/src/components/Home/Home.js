import React from 'react';
import TextField from '@material-ui/core/TextField';
import $ from "jquery";
import { expand, lock, norton, shopster, visa, master, pci, safe } from '../../assets/images';
import ProductHeader from '../Header/Header';
import queryString from 'query-string';
import { Spinner } from 'react-bootstrap';
import './Home.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      URLToken: null,
      transactionDetails: {},
        pgType: "",
        tokenId: "",
        programCode: "",
        email : ""
      };
  }

    getURLToken = () => {
        let resultantQuery = queryString.parse(this.props.location.search);
        let uRLToken = resultantQuery.Token;
        if (uRLToken != null) {
            this.setState({
                URLToken: uRLToken
            })
        }
        else {
            window.location.replace("/Error/?message= Invalid Url token");
        }
    }

    validateToken = () => {
        let resultantQuery = queryString.parse(this.props.location.search);
        let uRLToken = resultantQuery.Token;
        if (uRLToken == null) {
            //this.props.history.push("/Error/?message= Invalid Url token");
            window.location.replace("/Error/?message= Invalid Url token");
        }
        console.log(uRLToken);
        //api calling
        let urldata = {
            UrlToken: uRLToken
        }
        
        console.log(process.env.REACT_APP_MERCHANTAPI_URL);
        axios.post(process.env.REACT_APP_MERCHANTAPI_URL, urldata).then(res => {
            console.log(res.data);
            if (res.data.item1.toLowerCase() === "verified") {
                if (res.data.item3 != null && res.data.item4 != null) {
                    this.setState({
                        tokenId: res.data.item3,
                        programCode: res.data.item4
                    }, () => { this.getTransactionDetails() })
                }
                else {
                    console.log("not verified");
                    //this.props.history.push("/Error/?message= token not found");
                    window.location.replace("/Error/?message= token not found");
                }
            }
            else {
                console.log("not verified");
                //this.props.history.push("/Error/?message=" + res.data.item2 != null ? res.data.item2 : "invalid token");
                window.location.replace("/Error/?message = " + res.data.item2 != null ? res.data.item2 : "invalid token");
            }
        })
            .catch(res => {
             //this.props.history.push("/error/?message=invalid url");
             window.location.replace("/error/?message=invalid url");

         })
        
        console.log(this.state.programCode);
    }
    getTransactionDetails = () => {
        let resultantQuery = queryString.parse(this.props.location.search);
        let uRLToken = resultantQuery.Token;
        console.log(this.state.programCode);
        console.log(this.state.tokenId);
        
        let data = {
            ProgramCode: this.state.programCode,
            TokenId: this.state.tokenId
        }
        console.log("data"+data);
        let url = process.env.REACT_APP_BASE_URL + "api/TxnDetail/getMerchantTxnDetails";
        axios.post(url, data).then(res => {
            console.log(res.data);
            if (res.data.paymentStatus.toLowerCase() == "done") {
                //this.props.history.push("/PaymentDone/?merchanttxnid=" + res.data.mercantTxnid);
                window.location.replace("/PaymentDone/?merchanttxnid=" + res.data.mercantTxnid);
            }
            else {
                window.sessionStorage.setItem("programCode", res.data.programCode);
                window.sessionStorage.setItem("storeCode", res.data.storeCode);

                let transactionDetails = {
                    fName: res.data.firstName != null || res.data.firstName != "" ? res.data.firstName : "storepay" ,
                    programName: res.data.programCode,
                    storeCode: res.data.storeCode,
                    email: res.data.email,
                    mobileNumber: res.data.phone,
                    productInfo: "storepay",
                    amount: res.data.amount,
                    customerName: res.data.firstName != null ? res.data.firstName : "storepay",
                    mercantTxnId: res.data.mercantTxnid,
                    terminalId: res.data.terminalId,
                    PgtxnId: "TXN" + res.data.storeCode + Date.now(),
                    programCode: this.state.programCode,
                    tokenId: this.state.tokenId,
                    uRLToken: uRLToken
                }
                this.setState({
                    email: res.data.email,
                    transactionDetails: transactionDetails,
                    loader: false
                }, () => { this.updateTokenDetails() })
            }
          
        })

    }
    updateTokenDetails = () => {
        let data = {
            ProgramCode: this.state.programCode,
            TokenId: this.state.tokenId
        }
        let url = process.env.REACT_APP_BASE_URL + "api/TxnDetail/updateTokenStatusOnPicked";
        axios.post(url, data).then(() => {
            console.log("status picked");
        }
        )
    }   
    componentDidMount() {
    this.getURLToken();
    this.validateToken();
    this.setState({
      loader: true
    });
    $(".expand_input").click(function () {
    $(".expand").slideToggle();
    });
    
  }

  pgTypeHandler = (event) => {
    const pgType = event.target.value;
    this.setState({
      pgType: pgType
    })
    console.log(this.state.pgType);
  }

    onMouseEnter = () => {
        alert("this mode is  currently not available in QAC mode");
    }
    onContinueHandler = () => {
        alert("please select the payment mode");
    }
  render() {
    this.props.pgTypeAdded(this.state.pgType);
    this.props.transactionDetailsAdded(this.state.transactionDetails);
      const { loader, transactionDetails, pgType } = this.state;
    //const { txnDetails } = this.props;
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
          <div className="user_detail_wrap">
                    <h4>Hi <b>{transactionDetails.fName === "storepay" ? "Member" : transactionDetails.fName}</b>, Please proceed to complete your payment</h4>
                    <div className="input_group">
                        <TextField id="email-id" label="Email ID" variant="outlined" value={this.state.email} />
            </div>
            <span className="expand_input">
              <img src={expand} alt="Collapse" />   
            </span>
            <div className="input_group expand">
              <TextField id="phone" label="Mobile Number" variant="outlined" value={transactionDetails.mobileNumber} />
            </div>
          </div>
          <div className="payment_option">
            <h4>Payment Option</h4>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test2" name="radio-group" value="cc" onChange={this.pgTypeHandler} />
                <label htmlFor="test2">Credit Card</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test3" name="radio-group" value="dc" onChange={this.pgTypeHandler} />
                <label htmlFor="test3">Debit Card</label>
              </div>
            </div>
            <div className="payment_checkbox">
                        <div className="radio_wrap" >
                            <input type="radio" id="test4" name="radio-group" value="nb" onChange={this.pgTypeHandler} />
                <label htmlFor="test4">Net Banking</label>
              </div>
            </div>
            <div className="payment_checkbox">
                        <div className="radio_wrap">
                            <input type="radio" id="test6" name="radio-group" value="upi"  onChange={this.pgTypeHandler} />
                <label htmlFor="test6">UPI</label>
              </div>
            </div>
                </div>
                <div className="button_group" onMouseEnter={pgType === "" ? this.onContinueHandler:null}>
                    <button>CANCEL</button>
                    <Link to={pgType === "cc" || pgType === "dc" ? "/Home1" : pgType === "nb" ? "/NetBanking" : "/Upi" } style={{ pointerEvents: pgType === "" ? 'none' : 'visible' }}  >CONTINUE</Link>
          </div>
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
    txnDetails: state.transactionDetails
  };
}
const mapDispatchToProps = dispatch => {
  return {
    transactionDetailsAdded: (tDetails) => dispatch({ type: 'GET_TRANSACTION_DETAILS', payload: tDetails }),
    pgTypeAdded : (pgt) => dispatch({type:'GET_PGTYPE',payload:pgt})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);