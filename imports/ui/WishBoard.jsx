    
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
  

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if(parseInt(nextProps, 10)!== parseInt(this.props,10)) {
  //     this.setState({postsLoaded:false});
  //     this.contentLoaded=0;
  //   }
  // }

  // getUser(userId) {
  //   Meteor.call("user.getOne", userId, (err, res) => {
  //     if (err) {
  //       alert("There was error updating check the console");
  //       console.log(err);
  //     }
  //     console.log("succeed",res);
  //   });
  // }

  getGiftName(giftId) {
    // Meteor.call("gift.getOne", giftId, (err, res) => {
    //   if (err) {
    //     alert("There was error updating check the console");
    //     console.log(err);
    //   }
    //   console.log("succeed",res);
    // });
    for (var i = 0; i < this.props.gifts.length; i++) {
      if (this.props.gifts[i]._id === giftId) {
        return this.props.gifts[i].name;
      }
    }
  }

  // getUserName(userId) {
  //   Meteor.users.find({
  //     _id: userId
  //   }).fetch().map((u) =>{
  //     return u.username;
  //   });
  // }

  render() {
    if (!this.props.ready) {
      return <div>loading</div>;
    }
    return (
      <div className = "container">
        <div className="row">
          <div className="row">
            {this.props.wishes.map(wish => (
              <div key={wish._id} className="col-12">
                <div className = "container" >
                  <h5>{wish.username} asked for a <span id="giftName">{this.getGiftName(wish.giftId)}</span></h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

WishBoard.propTypes = {
  wishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool.isRequired
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