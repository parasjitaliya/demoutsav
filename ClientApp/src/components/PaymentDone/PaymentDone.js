﻿import React from 'react';
import 'semantic-ui-css/semantic.min.css'
// import $ from "jquery";
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



class PaymentDone extends Component {
    state = {
      loader: false,
        tDetails: {},
        modalOpen: false
    }
    componentDidMount() {
        this.setState({
            tDetails: queryString.parse(this.props.location.search),
            loader: false

        });
        //window.history.pushState(null, null, window.location.href);
        //window.onpopstate = (event) => {
        //    //this.props.history.push("/Error/?message= oops! error occured. Do not hit the back button");
        //    window.location.replace("/Error/?message= oops! error occured. Do not hit the back button");

        //};

        window.addEventListener('popstate', function (event) {
            if (event.state) {
                alert('!!');
                window.location.replace("/Error/?message= oops! error occured. Do not hit the back button");
            }
        }, false);
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
                                    <h4>Payment is already recieved ! </h4>
                                </div>
                                <div className="transaction_detail row">
                                    <div className="col label">
                                        <p>Bill ID</p>
                                        {/*<p>Transaction ID</p>*/}
                                        <p>Time</p>
                                    </div>
                                    <div className="col content">
                                        <p>{tDetails.merchanttxnid}</p>
                                        {/*<p>{tDetails.txnId}</p>*/}
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
export default connect(mapStateToProps)(PaymentDone);
