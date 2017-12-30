var keystone = require('keystone');
var Member = keystone.list('Member');
var Converter = require('csvtojson').Converter;
var fs = require('fs');

function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Main function
exports = module.exports = function (file, done) {
  var converter = new Converter({});
  var notes = {};

  converter.on('end_parsed', function (records) {
    for (var i = 0; i < records.length; i++) {
      const record = records[i];

      let member = new Member.model({
        firstName: toTitleCase(record.FirstName),
        lastName: toTitleCase(record['Surname *']),
        maidenName: toTitleCase(record.MaidenName),
        status: record.Status.toLowerCase(),
        contactViaMail: record.ContactMethod === 'Both' || record.ContactMethod === 'Mail',
        contactViaEmail: record.ContactMethod === 'Both' || record.ContactMethod === 'Email',
        apt: record.Apt,
        address: toTitleCase(record.Address),
        city: toTitleCase(record.City),
        province: record.Prov,
        country: toTitleCase(record.Country),
        postal: record.Postal,
        phone: record.Phone,
        husband: toTitleCase(record.Husband),
        startYear: record['StartYr:'],
        endYear: record['EndYr:'],
        email: record.Email,
        // dateOfDeath: { type: Types.Date },
        // change: { type: Types.Text },
        changeReason: record.ChangeReason,
      });

      if (member.country === 'U.s.a.'
        || member.country === 'U.s.a'
        || member.country === 'Usa') {
        member.country = 'USA';
      }

      if (!notes[member.country]) {
        notes[member.country] = true;
        console.log(member.country);
      }

      member.save();
    }

    setTimeout(done, 2000);
  });


  fs.createReadStream(file).pipe(converter);
};
