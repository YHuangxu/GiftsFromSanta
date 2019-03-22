import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Gifts = new Mongo.Collection("gifts");

if (Meteor.isServer) {
  Meteor.publish("gifts", function giftsPublication() {
    return Gifts.find({}, {
      limit: 50,
      sort: {
        amount: -1
      }
    });
  });
}

Meteor.methods({
  "gifts.insert"(info) {
    check(info.name, String);
    check(info.url, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Gifts.insert({
      name: info.name,
      url: info.url,
      amount: 0,
      createdAt: Date.now()
    });
  }, 
  
  "gifts.updateAmt"(info) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    //let targetId = new Mongo.ObjectID(info.id);
    let targetId = info.id;
    Gifts.update(
      {_id: targetId},
      {$inc:{amount: info.amt}}
    );
    //Gifts.remove({amount:0});
  },
  "gift.getOne"(giftId) {
    check(giftId, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Gifts.findOne({
      _id: giftId
    });
  }, 
});



