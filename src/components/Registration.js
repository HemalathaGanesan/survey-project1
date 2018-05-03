import React, { Component } from 'react';
import './Registration.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      isMailSent: false,
      isValidPass: false,
      isValidConfPass: false,
    }
  }

  storeData(e) {
    e.preventDefault();
    let data = {
      "email": this.refs.email.value,
      "password": this.refs.password.value,
      "hospital": this.refs.hospital.value
    }
    // console.log(data)

    if (this.refs.confirmPassword.value.length < 8 || (this.refs.password.value !== this.refs.confirmPassword.value)) {
      this.setState({ isValidConfPass: true })
    } else {
      this.setState({ isValidConfPass: false });
      this.postReq(data);
    }

    this.props.dispatch({
      type: 'REGISTRATION_DATA',
      payload: {
        email: this.refs.email.value,
        password: this.refs.password.value,
        hospital: this.refs.hospital.value
      }
    })
  }
  postReq(data) {
    console.log(data)
    fetch("http://localhost:3001/api/registration", {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST'
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    this.setState({ isMailSent: true })
    setTimeout(() => this.setState({ isMailSent: false }), 5000);
    this.refs.registrationForm.reset();
  }


  validatePass(e) {
    console.log(this.refs.password.value);
    if (this.refs.password.value === '') {
      this.setState({ isValidPass1: false, isValidPass2: false, isValidPass3: false });
    } else if (this.refs.password.value.length < 8) {
      this.setState({
        isValidPass1: true, isValidPass2: false, isValidPass3: false
      })
    } else if (!this.refs.password.value.match(/[A-Z]/)) {
      this.setState({
        isValidPass2: true, isValidPass3: false, isValidPass1: false
      })
    } else if (!this.refs.password.value.match(/[0-9]/)) {
      this.setState({
        isValidPass3: true, isValidPass1: false, isValidPass2: false
      })
    } else {
      this.setState({
        isValidPass1: false, isValidPass2: false, isValidPass3: false
      })
    }
  }
  validateConfPass(e) {
    console.log(this.refs.confirmPassword.value)
    if (this.refs.confirmPassword.value !== '') {
      this.setState({ isValidConfPass: false });
    } else this.setState({ isValidConfPass: false });
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
                      <input type="password" className="form-control" id="password" ref="password" placeholder="Password" required onChange={this.validatePass.bind(this)} />
                      {/* <small><p className="text-left">password should atleast 8 characters</p></small> */}
                      {/* {this.state.isValidPass && <div className="alert alert-danger alert-dismissible fade show text-left" role="alert">
                        <strong>Password must have</strong>
                        <ul>
                          <li>atleast 8 characters</li>
                          <li>1 uppercase(A-Z)</li>
                          <li>1 number(0-9)</li>
                        </ul>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>} */}
                      {this.state.isValidPass1 && <div className="alert alert-danger" role="alert">password must atleast 8 characters!</div>}
                      {this.state.isValidPass2 && <div className="alert alert-danger" role="alert">1 uppercase!</div>}
                      {this.state.isValidPass3 && <div className="alert alert-danger" role="alert">1 number!</div>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="confirmPassword" className="col-sm-4 col-form-label required">Confirm Password</label>
                    <div className="col-sm-8">
                      <input type="password" className="form-control" id="confirmPassword" ref="confirmPassword" placeholder="Confirm Password" required onChange={this.validateConfPass.bind(this)} />
                      {this.state.isValidConfPass && <div className="alert alert-danger" role="alert">password didn't match!</div>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="hospital" className="col-sm-4 col-form-label required">Hospital</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="hospital" ref="hospital" placeholder="Hospital" required />
                    </div>
                  </div>
                  <div>
                    <a href="http://localhost:3001/api/registration/auth/google">Google</a>
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </form>

              </div>
            </div>
            <span>Already have account? Login <Link to="/login"> Here</Link></span>
            {this.state.isMailSent && <div className="alert alert-success" role="alert">Confirmation mail has been sent to your mail</div>}
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
