import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataPresent: false
    }
  }
  componentDidMount() {
    localStorage.getItem('jwt-token') && (
      fetch('http://localhost:3001/api/dashboard/formname', {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer' + ' ' + localStorage.getItem('jwt-token'),
          'Content-Type': 'application/json'
        }),
      }).then(res => res.json())
        .then(name => {
          if (name.success) {
            localStorage.removeItem("jwt-token");
            window.location.href = "/verifyToken";
          } else {
            this.setState({ data: name, dataPresent: true });
          }
        })
        .catch(err => console.log(err)))
  }

  removeToken() {
    localStorage.removeItem("jwt-token");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  }

  render() {
    if (this.state.dataPresent) {
      var forms = (this.state.data).map((formName, idx) => {
        return (
          <div key={idx}>
            <div className="form-field">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{formName}</h5>
                      <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                to make a type specimen book</p>
                      <NavLink to={`dashboard/${formName}`} className="btn btn-primary">Go to Survey</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
      })
    }

    return (
      <div>
        {(localStorage.getItem('jwt-token')) ?
          (<div className="container-fluid">
            <div className="survey">
              <div className="header">
                <p>SURVEY</p>
                <button className="btn btn-danger" onClick={this.removeToken.bind(this)}>Logout</button>
              </div>
            </div>
            {forms}
          </div>) : (<Redirect to="/" />)}
      </div>
    )
  }
}

export default Dashboard;
