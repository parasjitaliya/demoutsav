import React from 'react';
import TextField from '@material-ui/core/TextField';
// import $ from "jquery";
import { lock, norton, shopster, question, visa, master, pci, safe } from '../../assets/images';
import ProductHeader from '../Header/Header';
import { Spinner } from 'react-bootstrap';
import './Home1.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import {GetHashValue} from '../../services/CustomerDetailsServices';

class Home1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      cardName: "",
      cardNumber: "",
      validThru: "",
      cvv: "",
      hash:""
    };
  }

    componentDidMount() {
    this.setState({
      loader: false
    });

        //window.history.pushState({ name: "browserBack" }, "on browser back click", window.location.href);
        //window.addEventListener('popstate', (event) => {
        //    if (event.state) {
        //        alert('lol')
        //    }
        //}, false);
  }
  formatString(event) {
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/'
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/'
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2'
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
    ).replace(
      /^([0]+)\/|[0]+$/g, '0'
    ).replace(
      // eslint-disable-next-line 
      /[^\d\/]|^[\/]*$/g, ''
    ).replace(
      /\/\//g, '/'
    );
  }

  cardNameHandler = (event) => {
      const cardName = event.target.value;
    this.setState({
      cardName: cardName
    })
  }

  cardNumberHandler = (e) => {
      const re = /^[0-9\b]+$/;
      // if value is not blank, then test the regex
      if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({ cardNumber: e.target.value })
      }
  }

  validThruHandler = (event) => {
      const validThru = event.target.value;
    this.setState({
      validThru: validThru
    })
  }
    cvvHandler = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ cvv: e.target.value })
        }
    }
    onMouseEnter = () => {
        alert("please fill the card details");
    }
 
  render() {
    const { loader } = this.state;
      const { txnDetails, pgType } = this.props;
      let actionUrl = process.env.REACT_APP_BASE_URL.toString() + "Payment/paymentProcess";
      let sfurl = process.env.REACT_APP_BASE_URL.toString() + "Payment/successProcess";
      const enabled = this.state.cardName.length > 0 && this.state.cardNumber.length > 0 && this.state.cvv.length > 0 && this.state.validThru.length > 0;
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
                    {
                        pgType === "cc" ? 
                            <h4>Credit Card</h4>
                            : 
                            <h4>Debit Card</h4>
                      }
                      <Link to={backUrl}>BACK</Link>
                </div>
                <form action={actionUrl} method="POST" > 
          <div className="payment_option_detail">
            <div className="input_group">
                            <TextField id="card-name" label="Name On Card" name="ccname" id="ccname" value={this.state.cardName} variant="outlined" onChange={this.cardNameHandler} />
            </div>
                        <div className="input_group">
                            <TextField id="card-number" inputProps={{ maxLength: 16 }} name="ccnum" id="ccnum" value={this.state.cardNumber} label="Enter Card Number" variant="outlined" onChange={this.cardNumberHandler} />
            </div>
            <div className="input_group validation">
                            <TextField id="card-valid" label="Valid Thru" variant="outlined" name="validthru" id="validthru" value={this.state.validThru} inputProps={{ maxLength: 5 }} placeholder="MM/YY" type="text" onKeyUp={(event) => this.formatString(event)} onChange={this.validThruHandler} />

              <img src={question} alt="Question" />
              <TextField id="card-cvv" type="password" label="CVV" value={this.state.cvv} name="ccvv" id="ccvv" inputProps={{ maxLength: 3 }} variant="outlined" onChange={this.cvvHandler} />
            </div>
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
                    <input type="hidden" name="mercantTxnid" id="mercantTxnid" value={txnDetails.mercantTxnId} />
                    <input type="hidden" name="programCode" id="programCode" value={txnDetails.programCode} />
                    <input type="hidden" name="storeCode" id="storeCode" value={txnDetails.storeCode} />
                    <input type="hidden" name="terminalId" id="terminalId" value={txnDetails.terminalId} />
                    <input type="hidden" name="tokenId" id="tokenId" value={txnDetails.tokenId} />
                    <input type="hidden" name="PgtxnId" id="PgtxnId" value={txnDetails.PgtxnId} />
                    <input type="hidden" name="URLToken" id="URLToken" value={txnDetails.uRLToken} />

                    <div className="button_group" onMouseEnter={enabled ? null : this.onMouseEnter}>
                        <button type="submit"
                            className="pay"
                            disabled={!enabled}
                            
                            >
                            PAY ₹ {txnDetails.amount}
                        </button>
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
export default connect(mapStateToProps)(Home1);