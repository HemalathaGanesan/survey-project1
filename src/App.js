import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Registration from './components/Registration';
import Login from './components/Login';
import RegisterWithGoogle from './components/RegisterWithGoogle';
import VerifyUser from './components/VerifyUser';
import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
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
          <Route path="/Dashboard" exact component={Dashboard} />
        </div>
      </Router>

    );
  }
}

export default App;
