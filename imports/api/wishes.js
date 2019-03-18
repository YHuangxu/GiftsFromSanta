import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Gifts } from "../api/gifts.js";

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

  // Meteor.publish("giftsOfWishes", function giftsOfWishesPublication() {
  //   let list=[];
  //   list.push(Wishes.find({}, {
  //     limit: 10, // top ten wishes
  //     sort: {
  //       createdAt: -1
  //     }
  //   }));
  //   let res = [];
  //   for (var i = 0; i < list.length;i++) {
  //     res.push(Gifts.findOne({
  //       _id: list[i].giftId
  //     }));
  //   };
  //   return res;
  // });

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