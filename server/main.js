import { Meteor } from "meteor/meteor";
import { Gifts } from "../imports/api/gifts.js";
import { check } from "meteor/check";
import { Mongo } from "meteor/mongo";


Meteor.startup(() => {
  Meteor.methods({
    "gifts.insert"(gift) {
      check(gift.name, String);
      check(gift.url, String);
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }
      Gifts.insert({
        name: gift.name,
        url: gift.url,
        amount: 1,
        createdAt: Date.now()
      });
    }, 
  
    "gifts.updateAmt"(info) {
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }
      var targetId = new Mongo.ObjectID(info.id);
      Gifts.update(
        {_id: targetId},
        {$inc:{amount: info.amt}}
      );
      Gifts.remove({amount:0});
    }
  });
});


