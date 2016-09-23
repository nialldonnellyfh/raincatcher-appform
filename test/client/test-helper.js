'use strict';

/*globals navigator:true*/

var testHelper = {};
var _ = require('lodash');

testHelper.startLoggingNotifications = function(mediator) {
  var topic = 'appform';
  mediator.subscribe(topic, function(event) {
    console.log('\x1b[36m%s\x1b[0m', '** sync event:', event.dataset_id, ':', event.code, ':',  event.message);
  });
  console.log('Listening for events on topic:', topic);
};

testHelper.stopLoggingNotifications = function(mediator) {
  var topic = 'appform';
  mediator.remove(topic);
  console.log('Stopped listnering for events on topic:', topic);
};

testHelper.overrideNavigator = function() {
  // Overide window.navigator.onLine to make sync work
  if (! navigator.oldNavigator) {
    var fakeNavigator = {};

    _.assign(fakeNavigator, navigator);
    fakeNavigator.onLine = true;
    fakeNavigator.oldNavigator = navigator;
    navigator = fakeNavigator;
  }
};

testHelper.restoreNavigator = function() {
  if (navigator.oldNavigator) {
    navigator = navigator.oldNavigator;
  }
};

module.exports = testHelper;
