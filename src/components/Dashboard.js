import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

class Dashboard extends Component {
  // componentWillMount() {
  //   // console.log(localStorage.getItem('jwt-token'))
  //   fetch("http://localhost:3001/api/dashboard/", {
  //     headers: new Headers({
  //       'Authorization': 'Bearer' + ' ' + localStorage.getItem('jwt-token'),
  //       'Content-Type': 'application/json'
  //     }),
  //     method: 'GET'
  //   }).then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  // }

  componentWillMount() {
    // console.log(document.cookie)
    // console.log(localStorage.getItem('jwt-token'))
    // if ((localStorage.getItem('jwt-token')) === null) {
    //   console.log("entered into if loop")
    //   localStorage.setItem('jwt-token', document.cookie.split('=')[1])
    // }
  }
  removeToken() {
    localStorage.removeItem("jwt-token");
    // res.clearCookie("key");
    window.location.reload();
  }

  render() {
    console.log("token", jwt.decode(localStorage.getItem('jwt-token')))
    return (
      <div>
        {(localStorage.getItem('jwt-token')) ?
          (<div>

            <nav className="navbar navbar-light bg-light">
              <h1>Welcome to Dashboard</h1>
              <button className="btn btn-danger" onClick={this.removeToken.bind(this)}>Logout</button>
            </nav>

            <div className="container"></div>
          </div>) : (<Redirect to="/login" />)}
      </div>
    )
  }
}

export default Dashboard;
