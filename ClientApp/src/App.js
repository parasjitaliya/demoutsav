import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Home from './components/Home/Home';
import Home1 from './components/Home1/Home1';
import Success from './components/Success/Success';
import Failed from './components/Failed/Failed';
import Error from './components/Error/Error';
import PaymentDone from './components/PaymentDone/PaymentDone';
import NetBanking from './components/NetBanking/NetBanking';
import Upi from './components/Upi/Upi';


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/" exact component={Home} />
                    <Route path="/Home1" exact component={Home1} />
                    <Route path="/NetBanking" exact component={NetBanking} />
                    <Route path="/Upi" exact component={Upi} />
                    <Route path="/Success" exact component={Success} />
                    <Route path="/Failed" exact component={Failed} />
                    <Route path="/Error" exact component={Error} />
                    <Route path="/PaymentDone" exact component={PaymentDone} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
