import React, { Component } from 'react'

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
  render() {
    return (
      <div>
        <h1 className="text-center">welcome to Dashboard</h1>
      </div>
    )
  }
}

export default Dashboard;
