import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Registration from './components/Registration';
import Login from './components/Login';
import RegisterWithGoogle from './components/RegisterWithGoogle'
import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/RegisterWithGoogle/:googleId" exact render={({ match }) => (
            <RegisterWithGoogle googleId={match.params.googleId} />
          )} />
          <Route path="/Dashboard" exact component={Dashboard} />
        </div>
      </Router>

    );
  }
}

export default App;
