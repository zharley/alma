var keystone = require('keystone');
var Member = keystone.list('Member');
var Converter = require('csvtojson').Converter;
var fs = require('fs');
var eachSeries = require('async').eachSeries;

function escapeRegex (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function onRecord (record, done) {
  const firstName = record.FirstName;
  const lastName = record['Surname *'];
  const maidenName = record.MaidenName;
  const startYear = parseInt(record['StartYr:'], 10);
  const endYear = parseInt(record['EndYr:'], 10);

  Member.model.find()
    .where('firstName', new RegExp(`^${escapeRegex(firstName)}$`, 'i'))
    .where('lastName', new RegExp(`^${escapeRegex(lastName)}$`, 'i'))
    .where('maidenName', new RegExp(`^${escapeRegex(maidenName)}$`, 'i'))
    .exec(function (err, members) {
      if (err) {
        done(err);
        return;
      }

      if (members.length !== 1) {
        if (record.Postal) {
          console.log(`${members.length} match(es) for ${firstName} ${lastName} (${maidenName}) (${startYear}-${endYear})`);
          console.log(`Should have a postal code: ${record.Postal}`);
        }
        done();
      } else {
        const member = members[0];
        member.postalCode = record.Postal;
        member.save(done);
      }
    });
}

exports = module.exports = function (done) {
  var converter = new Converter({});
  converter.on('end_parsed', function (records) {
    eachSeries(records, onRecord, done);
  });
  fs.createReadStream('doc/export.csv').pipe(converter);
};
