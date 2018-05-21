import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import jwt from "jsonwebtoken";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Formdata extends Component {
  constructor() {
    super();
    this.state = {
      dataPresent: false,
      data: []
    };
  }
  componentWillMount() {
    fetch(
      `http://localhost:3001/api/dashboard/user/${
        jwt.decode(localStorage.getItem("jwt-token")).email
      }/${this.props.location.pathname.slice(11)}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer "+ localStorage.getItem("jwt-token"),
          "Content-Type": "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          localStorage.removeItem("jwt-token");
          window.location.href = "/verifyToken";
        } else {
          this.setState({ dataPresent: true, data: response });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.dataPresent) {
      var tablebData = [];
      this.state.data.forEach((ele, idx) => {
        tablebData.push({
          date: ele.value.date,
          created: ele.value.email,
          survey: ele.value.title
        });
      });
    }
    var formName = this.props.location.pathname.slice(11);
    return (
      <div className="App">
        <div style={{ color: "white" }}>
          <BootstrapTable
            data={tablebData}
            version="4"
            options={{ noDataText: "Click on survey to give Survey" }}
          >
            <TableHeaderColumn isKey dataField="date">
              Date
            </TableHeaderColumn>
            <TableHeaderColumn dataField="created">
              Created By
            </TableHeaderColumn>
            <TableHeaderColumn dataField="survey">
              Survey Form
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <div style={{ textAlign: "end", margin: "1rem" }}>
          <NavLink to={`/dashboard/form/${formName}`}>
            <button type="button" className="btn btn-info">
              Survey
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Formdata;
