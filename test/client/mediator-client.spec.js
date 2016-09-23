'use strict';

/*globals window localStorage */

var $fh = require('../lib/feedhenry')
  , should = require('should')
  , mediator = require('fh-wfm-mediator/lib/mediator')
  , testHelper = require('./test-helper')
  ;

require('../../lib/wrappers/mediator-client')(mediator);

// alternative to loading fhconfig via xhr
window.fh_app_props = require('../lib/fhconfig.json');
window.$fh = $fh;

describe('Test appforms', function() {
  before(function() {
    this.timeout(15000);
    localStorage.clear();
    testHelper.overrideNavigator();
    return mediator.request('appform:init');
  });

  after(function() {
  });

  it('nothing blows up', function() {
    'true'.should.be.equal('true');
  });

  it('list works', function() {
    return mediator.request('appform:form:list')
    .then(function(forms) {
      forms.should.not.be.empty();
    }, function(error) {
      throw error;
    });
  });

  it('creating a submission works', function() {
    var submissionFields = [
      {fieldId: '56158387bc36069871b33bef', value: 'John'},
      {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
      {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
    ];
    return mediator.request('appform:form:load', '561582e5e375d65e34dd5d8e')
    .then(function(form) {
      should.exist(form);
      form.props._id.should.equal('561582e5e375d65e34dd5d8e');
      return mediator.request('appform:submission:create', [form, submissionFields, 1], {uid: 1});
    })
    .then(function(submission) {
      should.exist(submission);
      should.exist(submission.getLocalId());
      submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
    });
  });

  it('submitting a submission works', function() {
    var submissionFields = [
      {fieldId: '56158387bc36069871b33bef', value: 'John'},
      {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
      {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
    ];
    return mediator.request('appform:form:load', '561582e5e375d65e34dd5d8e')
    .then(function(form) {
      should.exist(form);
      form.props._id.should.equal('561582e5e375d65e34dd5d8e');
      return mediator.request('appform:submission:create', [form, submissionFields, 2], {uid: 2});
    })
    .then(function(submission) {
      return mediator.request('appform:submission:submit', submission, {uid: submission.getLocalId()});
    })
    .then(function(submission) {
      submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
      submission.props.status.should.equal('pending');
    });
  });

  it('uploading a submission works', function() {
    this.timeout(15000);
    var submissionFields = [
      {fieldId: '56158387bc36069871b33bef', value: 'John'},
      {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
      {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
    ];
    return mediator.request('appform:form:load', '561582e5e375d65e34dd5d8e')
    .then(function(form) {
      should.exist(form);
      form.props._id.should.equal('561582e5e375d65e34dd5d8e');
      return mediator.request('appform:submission:create', [form, submissionFields, 3], {uid: 3});
    })
    .then(function(submission) {
      should.exist(submission.props._ludid);
      should.exist(submission.getLocalId());
      return mediator.request('appform:submission:submit', submission, {uid: submission.getLocalId()});
    })
    .then(function(submission) {
      should.exist(submission.props._ludid);
      should.exist(submission.getLocalId());
      return mediator.request('appform:submission:upload', submission, {uid: submission.getLocalId(), timeout: 5000});
    })
    .then(function(submissionId) {
      return mediator.request('appform:submission:remote:load', submissionId);
    })
    .then(function(submission) {
      should.exist(submission);
      should.exist(submission.props._ludid);
      should.exist(submission.props._id);
      should.exist(submission.props.formId);

      submission.props.status.should.equal('submitted');
      submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
      return mediator.request('appform:submission:local:load', submission.props._ludid);
    })
    .then(function(submission) {
      submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
      submission.props.status.should.equal('submitted');
    });
  });
});
