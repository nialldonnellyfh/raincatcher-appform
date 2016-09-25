var sinon = require('sinon');

module.exports = function() {
  return sinon.stub().yields();
};