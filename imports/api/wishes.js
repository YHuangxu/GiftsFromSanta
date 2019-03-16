import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";


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

