var importer = require('../lib/importer');
exports = module.exports = function(done) {
  importer('doc/export.csv', done);
};
