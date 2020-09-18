import * as React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

class Demo extends Component {

    render() {
        return (
            <div>
                <form action="https://localhost:44358/Payment/paymentProcess" id="payment" method="POST" >
                    <input type="text" placeholder="cardholder name" name="ccname" id="ccname" /><br />
                    <input type="text" placeholder="card number" name="ccnum" id="ccnum" /><br/>
                    <input type="text" placeholder="exp month" name="ccexpmon" id="ccexpmon" /><br/>
                    <input type="text" placeholder="exp year" name="ccexpyr" id="ccexpyr" /><br/>
                    <input type="text" placeholder="cvv" name="ccvv" id="ccvv" /><br/>
                    <input type="hidden" name="email" id="email" value="shre@gmail.com" />
                    <input type="hidden" name="phone" id="phone" value="7000709194" />
                    <input type="hidden" name="productinfo" id="productinfo" value="shoe" />
                    <input type="hidden" name="surl" id="surl" value="https://localhost:44358/Payment/successProcess" />
                    <input type="hidden" name="furl" id="furl" value="https://localhost:44358/Payment/successProcess" />
                    <input type="hidden" name="amount" id="amount" value="6" />
                    <input type="hidden" name="firstName" id="firstName" value="shreyash" />
                    <input type="hidden" name="pg" id="pg" value="cc" />
                    <input type="hidden" name="UDF5" id="UDF5" value="" />
                    <input type="hidden" name="bankCode" id="bankCode" value="" />
                    <input type="hidden" name="mercantTxnid" id="mercantTxnid" value="txn042156" /><br />
                    <input type="hidden" name="programCode" id="programCode" value="storepay" /><br />
                    <input type="hidden" name="storeCode" id="storeCode" value="SMB001" /><br />
                    <input type="submit" value="pay"/>
                </form>
            </div>
        );
    }
}
export default connect()(Demo);
