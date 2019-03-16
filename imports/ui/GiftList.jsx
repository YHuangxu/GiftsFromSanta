import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Gifts } from "../api/gifts.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curId: "",
      curAmt: "",
      selected:[]
    };
  }

  onClick(evt) {
    let info = {
      id:evt.target.name,
      amt: evt.target.id === "addItem"? 1 : -1
    };

    Meteor.call("gifts.updateAmt", info,(err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });

    if (evt.target.id === "addItem") {
      this.setState({
        selected:[...evt.target.name]
      });
    }

    if (evt.target.id === "removeItem"){
      let newSelected = [].concat(this.state.selected);
      for (var i = 0; i < newSelected.length; i++) {
        if (newSelected[i] === evt.target.name) {
          newSelected.splice(i, 1);
        }
      }
      this.setState({
        selected: newSelected
      });
    }
  }

  selected(giftId) {
    for (var i = 0; i < this.state.selected.length; i++) {
      if (this.state.selected[i] === giftId) {
        return true;
      }
    }
    return false;
  }



  render() {
    return (
      <div className = "container">
        <div className="row">
          {this.props.gifts.map(gift => (
            <div key={gift._id} className="card col-xs-6 col-s-3">
              <div className = "container">
                <div className="card-top text-right count"><img src = "https://cdn2.iconfinder.com/data/icons/picons-essentials/71/gift-512.png" width = "30px"/>{gift.amount}</div>
                <img className="card-img-top" src={gift.url} alt={gift.name}/>
                <div className="card-body">
                  <h5 className = "card-text text-center">{gift.name}</h5>
                  <div className = "{{#if selected(gift._id)}} selected {{/if}}">
                    <button type="button" className="btn btn-success" id="addItem" name={gift._id} onClick = {this.onClick.bind(this)}>I want this!</button>
                    <button type="button" className="btn btn-warning" id="removeItem" name={gift._id} onClick = {this.onClick.bind(this)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

GiftList.propTypes = {
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("gifts");
  return {
    gifts: Gifts.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(GiftList);
