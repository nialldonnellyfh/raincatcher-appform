'use strict';

/*globals window localStorage */

var should = require('should')
  , client = require('../../lib/appform')
  , sinon = require('sinon')
  , fixtures = require('../fixtures')
  ;


// alternative to loading fhconfig via xhr
window.fh_app_props = require('../lib/fhconfig.json');


describe('Test appforms', function() {
  before(function(done) {
    localStorage.clear();
    window.$fh = {
      on: fixtures.$fh.on(),
      forms: {
        getForms: fixtures.$fh.forms.list(),
        init: fixtures.$fh.forms.init(),
        on: fixtures.$fh.forms.on()
      }
    };

    this.timeout(15000);
    client.init().then(done);
  });

  after(function() {
    window.$fh = null;
  });


  it('list works', function() {
    return client.list()
    .then(function(forms) {
      should(forms).not.be.empty();
      sinon.assert.calledOnce(window.$fh.forms.getForms);
    }, function(error) {
      throw error;
    });
  });

  //it('creating a submission works', function() {
  //  var submissionFields = [
  //    {fieldId: '56158387bc36069871b33bef', value: 'John'},
  //    {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
  //    {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
  //  ];
  //  return client.getForm('561582e5e375d65e34dd5d8e')
  //  .then(function(form) {
  //    should.exist(form);
  //    form.props._id.should.equal('561582e5e375d65e34dd5d8e');
  //    return client.createSubmission(form, submissionFields);
  //  })
  //  .then(function(submission) {
  //    should.exist(submission);
  //    should.exist(submission.props._ludid);
  //    should.not.exist(submission.props._id);
  //    should.exist(submission.props.formId);
  //
  //    submission.props.status.should.equal('new');
  //    submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
  //  });
  //});
  //
  //it('submitting a submission works', function() {
  //  var submissionFields = [
  //    {fieldId: '56158387bc36069871b33bef', value: 'John'},
  //    {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
  //    {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
  //  ];
  //  return client.getForm('561582e5e375d65e34dd5d8e')
  //  .then(function(form) {
  //    should.exist(form);
  //    form.props._id.should.equal('561582e5e375d65e34dd5d8e');
  //    return client.createSubmission(form, submissionFields);
  //  })
  //  .then(client.submitSubmission)
  //  .then(function(submission) {
  //    should.exist(submission);
  //    should.exist(submission.props._ludid);
  //    should.not.exist(submission.props._id);
  //    should.exist(submission.props.formId);
  //
  //    submission.props.status.should.equal('pending');
  //    submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
  //  });
  //});
  //
  //it('uploading a submission works', function() {
  //  this.timeout(15000);
  //  var submissionFields = [
  //    {fieldId: '56158387bc36069871b33bef', value: 'John'},
  //    {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
  //    {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
  //  ];
  //  return client.getForm('561582e5e375d65e34dd5d8e')
  //  .then(function(form) {
  //    should.exist(form);
  //    form.props._id.should.equal('561582e5e375d65e34dd5d8e');
  //    return client.createSubmission(form, submissionFields);
  //  })
  //  .then(client.submitSubmission)
  //  .then(client.uploadSubmission)
  //  .then(client.getSubmission)
  //  .then(function(submission) {
  //    should.exist(submission);
  //    should.exist(submission.props._ludid);
  //    should.exist(submission.props._id);
  //    should.exist(submission.props.formId);
  //
  //    submission.props.status.should.equal('submitted');
  //    submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
  //
  //    return client.getSubmissionLocal(submission.props._ludid);
  //  })
  //  .then(function(submission) {
  //    submission.props.formId.should.equal('561582e5e375d65e34dd5d8e');
  //    submission.props.status.should.equal('submitted');
  //  });
  //});
});
