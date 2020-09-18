import React from 'react';
// import $ from "jquery";
import { lock, norton, shopster, visa, master, pci, safe, error } from '../../assets/images';
import ProductHeader from '../Header/Header';
import { Spinner } from 'react-bootstrap';
import './Home2.scss'
import { Link } from 'react-router-dom';
import { Modal } from 'semantic-ui-react'


class Home2 extends React.Component {
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
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <div className="success_error_popup">
            <div className="popup_content">
              <div className="popup_img">
                <img src={error} alt="Error" />
              </div>
              <div className="info_msg">
                <h4>That Payment didn’t go through</h4>
                <p>In case any amount has been debited, same will be refunded back in 2 working days </p>
              </div>
              <div className="transaction_detail row">
                <div className="col label">
                  <p>Bill ID</p>
                  <p>Transaction ID</p>
                  <p>Time</p>
                </div>
                <div className="col content">
                  <p>MOJO74043475755353727</p>
                  <p>BB77727636266663633737</p>
                  <p>May 20. 2020 at 4:50pm</p>
                </div>
              </div>
              <div className="couse_msg">
              <h4>Why did it fail?</h4>
              <p>1. The CVV or Expiry Date might be wrong.</p>
              <p>2. Your Bank network might be down.</p>
              </div>
              <button className="action_close" onClick={this.handleClose}>Retry Later</button>
            </div>
          </div>
        </Modal>
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
            <h4>Net Banking</h4>
            <Link to={'/Home'}>BACK</Link>
          </div>
          <div className="payment_option">
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test2" name="radio-group" />
                <label htmlFor="test2">State Bank of India</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test3" name="radio-group" />
                <label htmlFor="test3">HDFC</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test4" name="radio-group" />
                <label htmlFor="test4">ICICI</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test5" name="radio-group" />
                <label htmlFor="test5">Axis</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <div className="radio_wrap">
                <input type="radio" id="test6" name="radio-group" />
                <label htmlFor="test6">PNB</label>
              </div>
            </div>
            <div className="payment_checkbox">
              <p className="more">+ More</p>
            </div>
          </div>
          <div className="button_group">
            <button className="pay"  onClick={this.handleOpen}>PAY ₹ 2,521.55</button>
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

export default Home2;