import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errorMsg: ""
    }
  }

  storeData(e) {
    e.preventDefault();
    let data = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    }
    // console.log(data)

    this.props.dispatch({
      type: 'LOGIN_DATA',
      payload: {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
    });
    // this.getReq(data);
    this.postReq(data);
  }

  // getReq(data) {
  //   // console.log(data)
  //   fetch(`http://localhost:3001/api/registration/${data.email}`, {
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     }),
  //     method: 'GET'
  //   }).then(res => res.json())
  //     .then(data => {
  //       // console.log(data);
  //       if (data[0].isVerified === false) {
  //         this.setState({ isVerified: true })
  //         setTimeout(() => this.setState({ isVerified: false }), 5000)
  //       } else {
  //         this.setState({ isVerified: false })
  //         this.props.history.push('/dashboard')
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  postReq(data) {
    fetch("http://localhost:3001/api/login/", {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST'
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('jwt-token', data.token);
          this.props.history.push("/dashboard");
          this.refs.loginForm.reset();
        } else {
          this.setState({ errorMsg: data.message })
          setTimeout(() => this.setState({ errorMsg: "" }), 5000);
        }
      })
      .catch(error => console.log(error));
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
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                    <div className="col-sm-8">
                      <input type="email" className="form-control" id="email" ref="email" placeholder="abcde@email.com" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
                    <div className="col-sm-8">
                      <input type="password" className="form-control" id="password" ref="password" placeholder="Password" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
            <p>Dont't have account? Register <Link to="/registration"> Here</Link></p>
            <p>Login with <a href="http://localhost:3001/api/registration/auth/google"><button className="btn fa fa-google button-google"> Google</button></a></p>
            {this.state.isVerified && <div className="alert alert-danger" role="alert">Mail not Verified</div>}
            {this.state.errorMsg && <div className="alert alert-danger" role="alert">{this.state.errorMsg}</div>}
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