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
          <NavBar />
          <div className = "container">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/gifts" component={GiftList} />
                  <Route path="/myWishes" component={WishBoard} />
                </Switch>
          <Footer />
        </div>
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