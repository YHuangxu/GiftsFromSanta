import React, { Component } from "react";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import { Meteor } from "meteor/meteor";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    const userPage = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/gifts">Gifts</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/myWishes">myWishes</NavLink>
        </li>
      </ul>
    );
    
    const guestPage = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/gifts">Gifts</NavLink>
        </li>
      </ul>
    );


    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Gifts from Santa
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {Meteor.userId()? userPage : guestPage}
            <AccountsUIWrapper />
          </div>

        </nav>
      </div>
    );
  }
}