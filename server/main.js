import {UserStatus} from 'meteor/mizzao:user-status';

setInterval(() => {
  UserStatus.connections.find().forEach((c) => {
    console.log("got", c);
  });
}, 1000);
