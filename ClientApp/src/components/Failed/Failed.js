import React from 'react';
import 'semantic-ui-css/semantic.min.css'
// import $ from "jquery";
import { lock, norton, shopster, visa, master, pci, safe, success, error } from '../../assets/images';
import ProductHeader from '../../components/Header/Header';
import { Spinner } from 'react-bootstrap';
import './Success.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import queryString from 'query-string';
import { Modal } from 'semantic-ui-react';
import moment from "moment";
import { useHistory } from 'react-router-dom';



class Success extends Component {
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
        window.history.pushState(null, null, null);
        window.onpopstate = (event) => {
            //this.props.history.push("/Error/?message= oops! error occured. Do not hit the back button");
            window.location.replace('/?Token=' + this.state.tDetails.urltoken);

        };
        console.log(this.state.tDetails);
        window.onload = ()=> {
            this.setState({
                modalOpen:true
            })
        }
    }

    //handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => {
        this.setState({ modalOpen: false })
        //this.props.history('/?Token=' + this.state.tDetails.urltoken);
        window.location.replace('/?Token=' + this.state.tDetails.urltoken);
    }

    render() {
        const { loader, tDetails } = this.state;

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
                                        <p>{tDetails.billId}</p>
                                        <p>{tDetails.txnId}</p>
                                        <p>{moment().format("DD-MM-YYYY hh:mm:ss")}</p>
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
                </div>
                </div>
        );
    }
}
export default connect()(Success);
