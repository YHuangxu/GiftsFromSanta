    
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
    };
  }

  // getGiftName(giftId) {
  //   return Gifts.findOne({_id: giftId}).name;
  // }

  render() {
    return (
      <div className = "container">
        <div className="row">
          {this.props.wishes.map(wish => (
            <div key={wish._id}>
              <div className = "container marquee">
                <p className = "label-txt">{wish.username} asked for a {wish.giftId}</p>
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
  const handle2 = Meteor.subscribe("gifts");
  return {
    wishes: Wishes.find({},{
      limit: 10,
      sort: {
        createdAt: -1
      }
    }).fetch(),
    user: Meteor.user(),
    ready : handle.ready() && handle2.ready()
  };
})(WishBoard);