import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Wishes = new Mongo.Collection("wishes");

if (Meteor.isServer) {
  Meteor.publish("wishes", function wishesPublication() {
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
    check(info.userId, String);
    check(info.userName, String);
    check(info.id, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Wishes.insert({
      userId: info.userId,
      username: info.userName,
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
    check(info.userId, String);
    check(info.userName, String);
    check(info.id, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    if (info.amt > 0) {
      Wishes.insert({
        userId: info.userId,
        username: info.userName,
        giftId: info.id,
        createdAt: Date.now()
      });
    } else {
      Wishes.remove({
        userId: info.userId,
        giftId: info.id
      });
    }
  }
});