import React from "react";
// import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import * as Survey from "survey-react";

class Form extends React.Component {
  constructor() {
    super();
    this.state={
      surveyJson:JSON,
      title:'String'
    }
  }
  componentWillMount(){
    console.log(this.props.location.pathname)
    var name=(this.props.location.pathname).slice(11);
    {(localStorage.getItem('jwt-token')) ?
          (fetch(`http://localhost:3001/api/forms/${name}`).then(data=>data.json()).then((result)=>{
            this.setState({surveyJson:result.form,title:name})
          })) : (<Redirect to="/" />)}
  }

  sendDataToServer(survey) {
    let userEmail=jwt.decode(localStorage.getItem('jwt-token')).email
    let formData={
      title:this.state.title,
      email:userEmail,
      field:survey.data
    }
   fetch("http://localhost:3001/api/survey",{
     method:"POST",
     body:JSON.stringify(formData),
     headers:new Headers({
       "Content-Type":"application/json"
     })
   }).then(data=>data.json())
   .then(result=>{
   })
 };
  render() {
    return (
      <div>
        {(localStorage.getItem('jwt-token')) ?
          (<Survey.Survey
            json={this.state.surveyJson}
            onComplete={this.sendDataToServer.bind(this)}
          />) : (<Redirect to="/" />)}
      </div>
    )

  }
}
export default Form
