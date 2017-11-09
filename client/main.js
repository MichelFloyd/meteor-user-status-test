import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  Meteor.subscribe('connections');
  Meteor.subscribe('me');
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});

Template.connections.onCreated(function(){
  const self = this;
  self.ipAddr = new ReactiveVar('');
  Meteor.call('getIpAddress',(err,result) => {
    if (!err) self.ipAddr.set(result);
  });
});

Template.connections.helpers({
  connections() {
    return Connections.find();
  },
  myIp() {
    return Template.instance().ipAddr.get();
    //return Connections.findOne({userId: Meteor.userId},{sort: {loginTime: -1}, limit: 1}).ipAddr;
  }
})

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
