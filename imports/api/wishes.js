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
    check(info.username, String);
    check(info.giftId, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Wishes.insert({
      username: info.username,
      giftId: info.giftId,
      createdAt: Date.now()
    });
  }, 
});