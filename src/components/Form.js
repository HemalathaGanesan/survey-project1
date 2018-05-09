import React from "react";
// import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import * as Survey from "survey-react";
import { connect } from "react-redux";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyJson: JSON,
      title: 'String'
    }
  }
  componentWillMount() {
    var name = (this.props.location.pathname).slice(11);

    (localStorage.getItem('jwt-token') && (
      fetch(`http://localhost:3001/api/dashboard/forms/${name}`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer' + ' ' + localStorage.getItem('jwt-token'),
          'Content-Type': 'application/json'
        }),
      }).then(data => data.json())
        .then((result) => {
          if (result.success) {
            localStorage.removeItem("jwt-token");
            window.location.href = "/verifyToken";
          }
          else {
            this.setState({ surveyJson: result.form, title: name })
          }
        })
        .catch(err => console.log(err))))
  }
  formateDate() {
    let dateObj = new Date();
    let dateString = JSON.stringify(dateObj);
    let date = dateString.slice(1, 11);
    return date;
  }
  sendDataToServer(survey) {
    let formData = {
      title: this.state.title,
      email: jwt.decode(localStorage.getItem('jwt-token')).email,
      hospital: jwt.decode(localStorage.getItem('jwt-token')).hospital,
      date:this.formateDate(),
      field: survey.data
    }
    fetch("http://localhost:3001/api/dashboard/survey", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('jwt-token'),
        "Content-Type": "application/json"
      })
    }).then(data => data.json())
      .then(result => {
      })
  };
  render() {
    return (
      <div>
        {localStorage.getItem("jwt-token") ? (
          <Survey.Survey
            json={this.state.surveyJson}
            onComplete={this.sendDataToServer.bind(this)}
          />
        ) : (
          <Redirect to="/" />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.registrationReducer;
};

export default connect(mapStateToProps)(Form);
