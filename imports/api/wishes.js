import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";


export const Wishes = new Mongo.Collection("wishes");

if (Meteor.isServer) {
  Meteor.publish("wishes", function giftsPublication() {
    return Wishes.find({}, {
      limit: 50,
      sort: {
        createdAt: -1
      }
    });
  });
}

Meteor.methods({
  "wishes.insert"(info) {
    check(info.user, String);
    check(info.id, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Wishes.insert({
      username: info.user,
      giftId: info.id,
      createdAt: Date.now()
    });
  }, 

  "wishes.remove"(id) {
    check(id, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Wishes.remove({
      _id: id
    });
  }, 

  "wishes.update"(info) {
    check(info.user, String);
    check(info.id, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    if (info.amt > 0) {
      Wishes.insert({
        username: info.user,
        giftId: info.id,
        createdAt: Date.now()
      });
    } else {
      Wishes.remove({
        username: info.user,
        giftId: info.id
      });
    }
  }
});