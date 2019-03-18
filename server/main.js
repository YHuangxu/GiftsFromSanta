import { Meteor } from "meteor/meteor";
import { Gifts } from "../imports/api/gifts.js";
import { check } from "meteor/check";
import { Mongo } from "meteor/mongo";
import { Wishes } from "../imports/api/wishes.js";


Meteor.startup(() => {
  
});


// Meteor.methods({
//   "user.getOne"(userId) {
//     check(userId, String);
//     if (!this.userId) {
//       throw new Meteor.Error("not-authorized");
//     }
//     Users.findOne({
//       _id: userId
//     });
//   }
// });