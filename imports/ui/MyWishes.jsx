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
    for (var i ; i < this.props.myWishes.length; i++) {
      list.push(this.getGift(this.props.myWishes[i].giftId));
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
        <table className="table table-light table-striped wishTable">
          <thead className="table-secondary">
            <tr>
              <th />
              <th className="w-20" scope="col">
                Gift Image
              </th>
              <th className="w-40" scope="col">
                Gift Name
              </th>
              <th className="w-10" scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.props.myWishes.map(wish => (
              <tr key={wish._id} className="myWishList">
                <th scope="row" />
                <td ><img className="img-container" src={this.getUrl(wish.giftId)} alt={this.getName(wish.giftId)}/></td>
                <td>{this.getName(wish.giftId)}</td>
                <td>
                  <button type="button" className="btn btn-warning" id="removeItem" name={wish._id} onClick = {this.onClick.bind(this)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

MyWishes.propTypes = {
  myWishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const handle2 = Meteor.subscribe("gifts");
  const handle = Meteor.subscribe("myWishes");
  
  return {
    myWishes: Wishes.find({
      userId: Meteor.userId()
    },{
      sort:{
        createdAt: -1
      }
    }).fetch(),
    gifts: Gifts.find({}).fetch(),
    user: Meteor.user(),
    ready : handle2.ready() && handle.ready()
  };
})(MyWishes);