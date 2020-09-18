import React from "react"
import $ from "jquery";
import { logo, expand, homeShop } from '../../assets/images';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col } from 'react-bootstrap'
import './Header.scss'
import { connect } from 'react-redux';


class ProductHeader extends React.Component {

  componentDidMount() {
    $(".expand_price").click(function () {
      $(this).toggleClass('collapsed');
      $(".expandable").slideToggle();
    });
  }
  render() {
    const {txnDetails} = this.props;
    return (
      <div className="nav_wrap">
        <Row className="header_row">
          <Col>
            <div className="logo_wrap">
                        <img src={homeShop} alt="logo" />
            </div>
          </Col>
          <Col>
            <div className="product_wrap">
              <h3>{txnDetails.programName} </h3>
                        {/*<p>Mehrauli-Gurgaon Rd, Heritage City</p>*/}
              <h1>
                <span>₹</span><b>{txnDetails.amount}</b>
                <span className="expand_price">
                  <img src={expand} alt="Collapse" />
                </span>
              </h1>
                        {/*<p className="time"><span>1m25s</span></p>*/}
            </div>
          </Col>
        </Row>
        <div className="expandable">
          <h4>Price Details</h4>
          <div className="price_details row">
            <div className="col label">
              <p>Bag Total</p>
              <p>Bag Discount</p>
              <p>Offer</p>
              <p>Order Total</p>
              <p>Delivery Charges</p>
            </div>
            <div className="col content">
                        <p>₹{txnDetails.amount}</p>
              <p>-₹0</p>
              <p>NA</p>
                        <p>₹{txnDetails.amount}</p>
              <p>₹0</p>
            </div>
          </div>
          <div className="devider"></div>
          <div className="price_details_footer row">
            <div className="col label">
              <p>Total</p>
            </div>
            <div className="col content">
                        <p>₹{txnDetails.amount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    txnDetails : state.transactionDetails
  };
}
export default connect(mapStateToProps)(ProductHeader);