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
      title: "String"
    };
  }
  componentWillMount() {
    var name = this.props.location.pathname.slice(11);
    localStorage.getItem("jwt-token") ? (
      fetch(`http://localhost:3001/api/forms/${name}`)
        .then(data => data.json())
        .catch(error => console.log("Error:", error))
        .then(result => {
          this.setState({ surveyJson: result.form, title: result._id });
        })
    ) : (
      <Redirect to="/" />
    );
  }
  formateDate() {
    let d = new Date();
    let con = JSON.stringify(d);
    let date = con.slice(1, 11);
    return date;
  }
  sendDataToServer(survey) {
    let userEmail = jwt.decode(localStorage.getItem("jwt-token")).email;
    let formData = {
      title: this.state.title,
      email: userEmail,
      // hospital:this.props.hospital,
      field: survey.data,
      date: this.formateDate()
    };
    // console.log(this.state.hospital)
    fetch("http://localhost:3001/api/survey", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(data => data.json())
      .then(result => {});
  }
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
    );
  }
}
const mapStateToProps = state => {
  return state.registrationReducer;
};

export default connect(mapStateToProps)(Form);
