'use strict';

var events = require('events');

module.exports = function($fh) {

  var submissionEventListener = new events.EventEmitter();

  submissionEventListener.on('submissionStarted', function(params) {
    var submissionId = params.submissionId;
    var submissionStartedTimestamp = params.submissionStartedTimestamp;
    console.log('****************************************')
    console.log('params', params);
    console.log('Submission with ID ' + submissionId + ' has started at ' + submissionStartedTimestamp);
    console.log('****************************************');
  });

  submissionEventListener.on('submissionComplete', function(params) {
    var submissionId = params.submissionId;
    var submissionCompletedTimestamp = params.submissionCompletedTimestamp;
    console.log('****************************************');
    console.log('params', params);
    console.log('Submission with ID ' + submissionId + ' has completed at ' + submissionCompletedTimestamp);
    console.log('****************************************');
  });

  $fh.forms.registerListener(submissionEventListener, function(err) {
    console.log('****************************************');
    if (err) {
      console.error(err);
    } else {
      console.log('submissionEventListener has now been registered with the $fh.forms Cloud API. Any valid Forms Events will now emit.');
    }
    console.log('****************************************');
  });
};
