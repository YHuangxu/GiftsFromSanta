import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import NavBar from "./NavBar.jsx";
import HomePage from "./HomePage.jsx";
import GiftList from "./GiftList.jsx";
import Footer from "./Footer.jsx";
import MyWishes from "./MyWishes.jsx";
import WishBoard from "./WishBoard.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="header">
            <NavBar />
          </div>
          <div>
            <WishBoard />
          </div>
          
          <div className = "container">
            <div className = "row">
              <div className = "col-12">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/gifts" component={GiftList} />
                  <Route path="/myWishes" component={MyWishes} />
                </Switch>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);