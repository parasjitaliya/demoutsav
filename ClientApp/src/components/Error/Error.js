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
import { Modal } from 'semantic-ui-react'



class Success extends Component {
    state = {
      loader: false,
        txnDetails: {},
        modalOpen: false
    }
    componentDidMount() {
        this.setState({
            txnDetails: queryString.parse(this.props.location.search),
            loader: false

        });
        console.log(this.state.txnDetails);
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
                                    <img src={error} alt="Error" />
                                </div>
                                <div className="info_msg">
                                    <h4>{this.state.txnDetails.message}</h4>
                                    {/*<p>{this.state.txnDetails.message} </p>*/}
                                </div>
                                {/*<button className="action_close" onClick={this.handleClose}>Retry Later</button>*/}
                            </div>
                        </div>
                    </Modal>
                </div>
                </div>
        );
    }
}
export default connect()(Success);
