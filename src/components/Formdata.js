import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Formdata extends Component {
  render() {
    var name = this.props.location.pathname.slice(16);
   // let userEmail = jwt.decode(localStorage.getItem("jwt-token")).email;
    return (
      <div className="App">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <div>
         <NavLink to={`/dashboard/value/${name}`}> <button type="button" class="btn btn-info">
            Survey 
          </button></NavLink>
        </div>
      </div>
    );
  }
}

export default Formdata;
