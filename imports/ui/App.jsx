import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import NavBar from "./NavBar.jsx";
import HomePage from "./HomePage.jsx";
import GiftList from "./GiftList.jsx";
import Footer from "./Footer.jsx";
import MyWishes from "./MyWishes.jsx";
import WishBoard from "./WishBoard.jsx";
import Profile from "./Profile.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        {Meteor.userId()? <WishBoard />: null}
        <div className = "container">
          <div className = "row">
            <div className = "col-12">
              <Switch>
                <Route exact path="/" component={HomePage} />
                {Meteor.userId()? <Route exact path="/gifts" component={GiftList} />: null}
                <Route path="/myWishes" component={MyWishes} />
                <Route path="/Profile" component={Profile} />
              </Switch>
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