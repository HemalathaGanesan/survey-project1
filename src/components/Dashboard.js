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
    console.log(this)
  }
  removeToken() {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  }

  render() {
    return (
      <div>
        {jwt.decode(localStorage.getItem('jwt-token')) ?
          (<div>

            <nav class="navbar navbar-light bg-light">
              <h1>Welcome to Dashboard</h1>
              <button className="btn btn-danger" onClick={this.removeToken.bind(this)}>Logout</button>
            </nav>

            <div className="container"></div>
          </div>) : (<div>

            <nav class="navbar navbar-light bg-light">
              <h1>Welcome to Dashboard</h1>
              <button className="btn btn-danger" onClick={this.removeToken.bind(this)}>Logout</button>
            </nav>

            <div className="container"></div>
          </div>)}
      </div>
    )
  }
}

export default Dashboard;
