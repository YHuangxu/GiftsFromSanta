import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Gifts } from "../api/gifts.js";
import { Wishes } from "../api/wishes.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";

class GiftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      newUrl: "",
      pageSize: 12,
      currentPage: 1,
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
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
      name:this.state.newName,
      url: this.state.newUrl
    };
    Meteor.call("gifts.insert",info, (err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });
  }

  onClick(evt) {
    let info = {
      id:evt.target.name,
      amt: evt.target.id === "addItem"? 1 : -1,
      userId: Meteor.userId(),
      userName: Meteor.user().username
    };

    Meteor.call("gifts.updateAmt", info,(err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });

    Meteor.call("wishes.update", info, (err, res) => {
      if (err) {
        alert("There was error updating check the console");
        console.log(err);
      }
      console.log("succeed",res);
    });
  }

  selected(giftId) {
    for (var i = 0; i < this.props.myWishes.length; i++) {
      if (this.props.myWishes[i].giftId == giftId) {
        return true;
      }
    }
    return false;
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substring(0, 20) });
    console.log(event.target.value);
  }

  render() {
    const {
      currentPage,
      pageSize,
      search
    } = this.state;
    let filteredGifts = this.props.gifts;
    if (search !== "") {
      filteredGifts = this.props.gifts.filter( gifts => {
        return (
          gifts.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        );
      });
    }

    const paginatedGifts = paginate(filteredGifts, currentPage, pageSize);
    return (
      <div className = "container">
        <div className="row">
          <form className="form-inline col-4">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.search}
              onChange={this.updateSearch}></input>

            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
          </form>
          {filteredGifts.length === 0? 
            <button type="button" className="btn btn-outline-danger my-2 my-sm-0" data-toggle="modal" data-target="#myModal">Add New</button> : null}

          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">What Gift Do You Want?</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form id="newItemForm">
                    <div className = "form-group">
                      <label>Gift Name</label>
                      <input type="text" className="form-control" id="newName" onChange= {this.onChange.bind(this)}/>
                    </div>
                    <div className = "form-group">
                      <label>Link</label>
                      <input type="text" className="form-control" id="newUrl" onChange= {this.onChange.bind(this)}/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-danger" data-dismiss="modal" onClick={this.onSubmit}>Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          {paginatedGifts.map(gift => (
            <div key={gift._id} className="card col-xs-6 col-s-3">
              <div className = "container">
                <div className="card-top text-right text-dark count"><img src = "https://cdn2.iconfinder.com/data/icons/picons-essentials/71/gift-512.png" width ="25px"/>{gift.amount}</div>
                <div className ="container img-box"><img className="card-img-top img-rounded" src={gift.url} alt={gift.name}/></div>
                <div className="card-body">
                  <h5 className = "card-text text-center">{gift.name}</h5>
                  {this.selected(gift._id) ? <button type="button" className="btn btn-outline-secondary" id="removeItem" name={gift._id} onClick = {this.onClick.bind(this)}>Remove</button>
                    :  <button type="button" className="btn btn-outline-dark" id="addItem" name={gift._id} onClick = {this.onClick.bind(this)}>I want it!</button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          itemsCount={filteredGifts.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }
}

GiftList.propTypes = {
  myWishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const handle2 = Meteor.subscribe("gifts");
  const handle = Meteor.subscribe("myWishes");
  
  return {
    gifts: Gifts.find({}, {
      sort: {
        amount: -1
      }
    }).fetch(),
    myWishes: Wishes.find({userId: Meteor.userId()}).fetch(),  
    user: Meteor.user(),
    ready : handle.ready() && handle2.ready()
  };
})(GiftList);
