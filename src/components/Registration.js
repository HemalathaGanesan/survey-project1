import React, { Component } from 'react';
import './Registration.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Registration extends Component {
  constructor() {
    super();
    this.state = { isMailSent: false }
  }
  storeData(e) {
    e.preventDefault();
    let data = {
      "email": this.refs.email.value,
      "password": this.refs.password.value,
      "hospital": this.refs.hospital.value
    }
    // console.log(data)
    this.props.dispatch({
      type: 'REGISTRATION_DATA',
      payload: {
        email: this.refs.email.value,
        password: this.refs.password.value,
        hospital: this.refs.hospital.value
      }
    })

    fetch("http://localhost:3001/api/login/", {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST'
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    this.setState({ isMailSent: true })
    setTimeout(() => this.setState({ isMailSent: false }), 5000)

    this.refs.registrationForm.reset();
  }

  render() {
    return (
      <div className="container text-center registration-container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-6">
            <div className="card border-dark">
              <h4 className="card-header">Registration</h4>
              <div className="card-body">

                <form onSubmit={this.storeData.bind(this)} ref="registrationForm">
                  <p style={{ color: 'red' }}>Note: * field's are mandatory</p>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 col-form-label required">Email</label>
                    <div className="col-sm-8">
                      <input type="email" className="form-control" id="email" ref="email" placeholder="Email" required />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label required">Password</label>
                    <div className="col-sm-8">
                      <input type="password" className="form-control" id="password" ref="password" placeholder="Password" required />
                      <small><p className="text-left">password should atleast 8 characters</p></small>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="confirmPassword" className="col-sm-4 col-form-label required">Confirm Password</label>
                    <div className="col-sm-8">
                      <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" required />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="hospital" className="col-sm-4 col-form-label required">Hospital</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="hospital" ref="hospital" placeholder="Hospital" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Register</button>
                </form>

              </div>
            </div>
            <span>Already have account? Login <Link to="/login"> Here</Link></span>
            {this.state.isMailSent && <div className="alert alert-success" role="alert">Mail has been sent to your mail</div>}
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.registrationReducer;
}

export default connect(mapStateToProps)(Registration);
