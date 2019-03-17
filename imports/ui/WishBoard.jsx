    
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Wishes } from "../api/wishes.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class WishBoard extends Component {
  render() {
    return (
      <div className = "container">
        <div className="row">
          {this.props.wishes.map(wish => (
            <div key={wish._id} className="">
              <div className = "container" >
                <div>
                  <h5>WishBoard</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

WishBoard.propTypes = {
  wishes: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default withTracker(() => {
  const handle = Meteor.subscribe("wishes");
  return {
    wishes: Wishes.find({
      limit:20,
      sort: {
        createdAt: -1
      }
    }).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(WishBoard);