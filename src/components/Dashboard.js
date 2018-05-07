import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


class Dashboard extends Component {
  constructor(){
    super();
    this.state={
      data:[],
      dataPresent:false
    }
  }
  componentDidMount(){
    fetch('http://localhost:3001/api/formname').then(res=>res.json()).then(name=>{
      this.setState({data:name,dataPresent:true})
    })
  }
  removeToken() {
    console.log('remove')
    localStorage.removeItem("jwt-token");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // sessionStorage.removeItem("jwt-token");
    // res.clearCookie("key");
    window.location.reload();
  }

  render() {
    if(this.state.dataPresent){
      var forms=(this.state.data).map((formName,idx)=>{
        return(
          <div key={idx}>
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
        </div>)
      }) 
    }
    console.log("token", jwt.decode(localStorage.getItem('jwt-token')))
    return (
      <div>
        {(localStorage.getItem('jwt-token')) ?
          (<div className="container-fluid">
          <div className="header">
          <p>SURVEY
         </p>
         <button className="btn btn-danger" onClick={this.removeToken.bind(this)}>Logout</button>
          </div>
          {forms}
            </div>) : (<Redirect to="/" />)}

      </div>
    )
  }
}

export default Dashboard;
