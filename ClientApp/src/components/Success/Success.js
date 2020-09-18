import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import $ from "jquery";
import { lock, norton, shopster, visa, master, pci, safe, success } from '../../assets/images';
import ProductHeader from '../../components/Header/Header';
import { Spinner } from 'react-bootstrap';
import './Success.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import queryString from 'query-string';
import { Modal } from 'semantic-ui-react'
import moment from "moment";


class Success extends Component {
    state = {
      loader: false,
        tDetails: {},
        modalOpen: false
    }
    
    componentDidMount() {
        $(document).ready(function () {
            //right click disabled
            document.addEventListener('contextmenu', event => event.preventDefault());
            //back button diactivate
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
                alert('back button hit');
                window.history.go(1);
            };

            //ctrl +u disabled	
            document.onkeydown = function (e) {
                if (e.ctrlKey &&
                    (e.keyCode === 85 ||
                        e.keyCode === 117)) {
                    return false;
                } else if (e.keyCode === 123) {
                    return false;
                } else {
                    return true;
                }
            };

            $(document).keypress("u", function (e) {
                if (e.ctrlKey) {
                    return false;
                }
                else {
                    return true;
                }
            });



        });
        this.setState({
            tDetails: queryString.parse(this.props.location.search),
            loader: false

        });
        console.log(this.state.tDetails);
        window.onload = ()=> {
            this.setState({
                modalOpen:true
            })
        }
    }
    //handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    
    render() {
    const { loader } = this.state;
        const { tDetails} = this.state;

        return (
            <div className="mainContainer">
                {loader &&
                    <div className="loader">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                <div className="mainContainer">
                    <Modal
                        open={this.state.modalOpen}
                        //onClose={this.handleClose}
                        basic
                        size='small'
                    >
                        <div className="success_error_popup">
                            <div className="popup_content">
                                <div className="popup_img">
                                    <img src={success} alt="Success" />
                                </div>
                                <div className="info_msg">
                                    <h4>Payment Done successfully</h4>
                                    <p>Thank you for your payment of ₹ <b> {tDetails.amount} </b>has been received, Check your email for digital receipt </p>
                                </div>
                                <div className="transaction_detail row">
                                    <div className="col label">
                                        <p>Bill ID</p>
                                        <p>Transaction ID</p>
                                        <p>Time</p>
                                    </div>
                                    <div className="col content">
                                        <p>{tDetails.billId}</p>
                                        <p>{tDetails.txnId}</p>
                                        <p>{moment().format("DD-MM-YYYY hh:mm:ss")}</p>
                                    </div>
                                </div>
                                {/*<button className="action_close" onClick={this.handleClose}>Done</button>*/}
                            </div>
                        </div>
                    </Modal>
                    
                </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        txnDetails: state.transactionDetails
    }
}
export default connect(mapStateToProps)(Success);
