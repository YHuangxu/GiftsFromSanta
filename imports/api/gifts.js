import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";


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



