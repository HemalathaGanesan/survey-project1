import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import Login from './Login'
// import Dashboard from './Dashboard';

class RegisterWithGoogle extends Component {
  constructor() {
    super();
    this.state = {}
  }

  storeData(e) {
    e.preventDefault();
    let data = {
      "hospital": this.refs.hospital.value
    }
    // console.log(data)
    this.putReq(data);
  }
  putReq(data) {
    fetch(`http://localhost:3001/api/registration/${this.props.userId}`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'PUT'
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ msg: data.message })
          setTimeout(() => this.setState({toRedirect: true}),2000)
          // this.props.history.push("/dashboard");
          this.refs.registrationForm.reset();
        } else {
          this.setState({ msg: data.message })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    if(this.state.toRedirect){
      return(
        <Redirect to="/dashboard" />
      )
    }
    return (
      <div className="container text-center registration-container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-6">
            <div className="card border-dark">
              <h4 className="card-header">One more step</h4>
              <div className="card-body">

                <form onSubmit={this.storeData.bind(this)} ref="registrationForm">
                  <p style={{ color: 'red' }}>Note: * field's are mandatory</p>

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
            {this.state.msg && <div className="alert alert-success" role="alert">{this.state.msg}</div>}
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

export default connect(mapStateToProps)(RegisterWithGoogle);
