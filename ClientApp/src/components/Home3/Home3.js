import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'semantic-ui-css/semantic.min.css'
// import $ from "jquery";
import { lock, norton, shopster, visa, master, pci, safe, success } from '../../assets/images';
import ProductHeader from '../Header/Header';
import { Spinner } from 'react-bootstrap';
import './Home3.scss'
import { Link } from 'react-router-dom';
import { Modal } from 'semantic-ui-react'


class Home3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      modalOpen: false
    };
  }

  componentDidMount() {
    this.setState({
      loader: false
    });


  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { loader } = this.state;

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
            <Link to={'/Home'}>BACK</Link>
          </div>
          <div className="payment_option_upi">
            <div className="input_group">
              <TextField id="upi-id" label="Enter Your UPI ID" variant="outlined" />
              <button>Verify</button>
            </div>
          </div>
          <div className="button_group">
            <button className="pay" onClick={this.handleOpen}>PAY ₹ 2,521.55</button>
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

export default Home3;