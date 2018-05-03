import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = { isVerified: false }
  }

  storeData(e) {
    e.preventDefault();
    let data = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    }
    // console.log(data)
    this.getReq(data);

    this.props.dispatch({
      type: 'LOGIN_DATA',
      payload: {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
    });
    this.getReq(data);
  }

  getReq(data) {
    // console.log(data)
    fetch(`http://localhost:3001/api/registration/${data.email}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data[0].isVerified === false) {
          this.setState({ isVerified: true })
          setTimeout(() => this.setState({ isVerified: false }), 5000)
        } else {
          this.setState({ isVerified: false })
          this.props.history.push('/dashboard')
        }
      })
      .catch(error => console.log(error));
  }

  postReq(data) {
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
    this.refs.loginForm.reset();
  }

  render() {
    return (
      <div className="container text-center registration-container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-6">
            <div className="card border-dark">
              <h4 className="card-header">Login</h4>
              <div className="card-body">

                <form onSubmit={this.storeData.bind(this)} ref="loginForm">
                  <p style={{ color: 'red' }}>Note: * field's are mandatory</p>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 col-form-label required">Email</label>
                    <div className="col-sm-8">
                      <input type="email" className="form-control" id="email" ref="email" placeholder="abcde@email.com" required />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label required">Password</label>
                    <div className="col-sm-8">
                      <input type="password" className="form-control" id="password" ref="password" placeholder="Password" required />
                      {/* <small><p className="text-left">password should atleast 8 characters include </p></small> */}
                    </div>
                  </div>
                  <a href="http://localhost:3001/api/registration/auth/google" className="google-button">Google</a>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>

              </div>
            </div>
            <p>Dont't have account? Register <Link to="/registration"> Here</Link></p>
            {this.state.isVerified && <div className="alert alert-danger" role="alert">Mail not Verified</div>}
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.loginReducer;
}

export default connect(mapStateToProps)(Login);