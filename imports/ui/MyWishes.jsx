import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Wishes } from "../api/wishes.js";
import { Gifts } from "../api/gifts.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class MyWishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giftList : this.getGiftList(),
    };
    this.onClick = this.onClick.bind(this);
  }

  getGiftList() {
    let list = [];
    for (var i ; i < this.props.wishes.length; i++) {
      list.push(this.getGift(this.props.wishes[i].giftId));
    }
  }

  getGift(wishId){
    return Gifts.findOne({"_id": wishId.giftId});
  }

  getGiftInfo(giftId){
    let info ={
      url:"",
      name:""
    };
    for (var i ; i < this.state.giftList.length; i++) {
      if (this.state.giftList[i]._id === giftId) {
        info.url = this.state.giftList[i].url;
        info.name = this.state.giftList[i].name;
      }
    }
    return info;
  }

  onClick(evt) {
    Meteor.call("wishes.remove", evt.target.name, (err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });
  }


  getUrl(giftId){
    return Gifts.findOne({"_id": giftId}).url;
  }

  getName(giftId){
    return Gifts.findOne({"_id": giftId}).name;
  }

  render() {
    return (
      <div className = "container">
        <div className="row">
          {this.props.wishes.map(wish => (
            <div key={wish._id} className = "container myWishList">
              <div className="row">
                <div className ="col-3 img-container">
                  <img src={this.getUrl(wish.giftId)} alt={this.getName(wish.giftId)}/>
                </div>
                <div className ="col-6">
                  {this.getName(wish.giftId)}
                </div>
                <div className ="col-3">
                  <button type="button" className="btn btn-warning" id="removeItem" name={wish._id} onClick = {this.onClick.bind(this)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MyWishes.propTypes = {
  wishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle2 = Meteor.subscribe("gifts");
  const handle = Meteor.subscribe("wishes");
  
  return {
    wishes: Wishes.find({},{
      username: Meteor.userId(), 
      sort: {createdAt: -1}}).fetch(),
    gifts: Gifts.find({}).fetch(),
    user: Meteor.user(),
    ready : handle2.ready() && handle.ready()
  };
})(MyWishes);