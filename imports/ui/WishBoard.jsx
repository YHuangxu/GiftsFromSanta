    
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
      newGiftId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
  }

  onSubmit() {
    let info = {
      giftId: this.state.newGiftId,
      username: Meteor.userId()
    };
    Meteor.call("wishes.insert",info, (err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });
  }

  getGiftName(giftId) {
    let found = Gifts.findOne({"_id": giftId});
    return found.name;
  }

  render() {
    return (
      <div className = "container">
        <div className="row">
          <form id="newWishForm">
            <div className = "form-group">
              <label>//WishBoard//for development ONLY, addGiftId</label>
              <input type="text" className="form-control" id="newGiftId" onChange= {this.onChange.bind(this)}/>
            </div>
            <button type="button" className="btn btn-danger" data-target = "#newWishForm" onClick = {this.onSubmit.bind(this)}>Add Wish</button>
          </form>
        </div>
        <div className="row">
          {this.props.wishes.map(wish => (
            <div key={wish._id} className="col-12">
              <div className = "container" >
                <h5>{wish.username} asked for a {this.getGiftName(wish.giftId).bind(this)}</h5>
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