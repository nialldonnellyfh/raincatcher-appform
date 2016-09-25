//Mock feedhenry.js file
var sinon = require('sinon');

module.exports = {
  forms: require('./forms'),
  on: function(returnErr) {
    var stub = sinon.stub();

    stub.withArgs(sinon.match.string, sinon.match.func).callsArgWith(1, returnErr ? new Error("FH Event Error") : null);

    stub.throws("Invalid Arguments");

    return stub;
  }
};