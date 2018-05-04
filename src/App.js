import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Registration from './components/Registration';
import Login from './components/Login';
import RegisterWithGoogle from './components/RegisterWithGoogle';
import VerifyUser from './components/VerifyUser';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage'
import jwt from 'jsonwebtoken';


class App extends Component {
  render() {
    // let display;
    // if(jwt.decode(localStorage.getItem('jwt-token'))){
    //   display=<Route path="/Dashboard" exact component={Dashboard} />;
    // }
    // else{
    //   display=(<Redirect to="/error" />)
    // }
    return (
      <Router>
        <div>
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/RegisterWithGoogle/:userId" exact render={({ match }) => (
            <RegisterWithGoogle userId={match.params.userId} />
          )} />
          <Route path="/verifyUser/:userId" exact render={({ match }) => (
            <VerifyUser userId={match.params.userId} />
          )} />

          <Route path="/error" exact component={ErrorPage} />

          {jwt.decode(localStorage.getItem('jwt-token')) ?
            (<Route path="/Dashboard" exact component={Dashboard} />) : (<div></div>)}
        </div>
      </Router>
    );
  }
}

export default App;
