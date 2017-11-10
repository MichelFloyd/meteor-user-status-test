import { Accounts } from 'meteor/accounts-base';
import {UserStatus} from 'meteor/mizzao:user-status';

Meteor.publish('connections',()=>{
  return Connections.find();
});

Meteor.publish('me',function(){
  return Meteor.users.find(this.userId);
});

Meteor.startup(() => {
  if (!Meteor.users.findOne()){
    Accounts.createUser({email: "admin@admin.com", password: "password"});
  }
  Meteor.setInterval(()=>{    
    UserStatus.connections.find().forEach((c) => {
      console.log("got", c);
      Connections.upsert({_id: c._id},{$set: c});
    });
  },10000);
});

let ipAddr;

Meteor.onConnection((connection) => {
  ipAddr = connection.clientAddress;
});

Meteor.methods({
  getIpAddress() {
    return ipAddr;
  }
});

