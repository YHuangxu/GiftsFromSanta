    
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Wishes } from "../api/wishes.js";
import { Gifts } from "../api/gifts.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class WishBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: this.props.wishes
    };
    console.log(this.props.wishes);
  }

  getDisplay(){
    //return this.props.wishes[0].username;
  }

  componentDidMount() {
    this.getDisplay();
  }

  render() {
    return (
      <div className = "container">
        <div className="row">
          WishBoard
        </div>
      </div>
    );
  }
}

WishBoard.propTypes = {
  wishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("wishes");
  const handle2 = Meteor.subscribe("gifts");
  return {
    wishes: Wishes.find({},{
      limit: 10,
      sort: {
        createdAt: -1
      }
    }).fetch(),
    gifts: Gifts.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready() && handle2.ready()
  };
})(WishBoard);