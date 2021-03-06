import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Registration from './components/Registration';
import Login from './components/Login';
import RegisterWithGoogle from './components/RegisterWithGoogle';
import VerifyUser from './components/VerifyUser';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage'
import Form from "./components/Form";
import UserDetails from './components/UserDetails';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/registerWithGoogle/:userId" exact render={({ match }) => (
            <RegisterWithGoogle userId={match.params.userId} />
          )} />
          <Route path="/registerWithGoogle" exact component={RegisterWithGoogle} />
          <Route path="/verifyUser/:userId" exact render={({ match }) => (
            <VerifyUser userId={match.params.userId} />
          )} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/:forms" exact component={UserDetails} />
          <Route path="/dashboard/form/:form" exact component={Form} />
        </div>
      </Router>
    );
}  }


export default App;















