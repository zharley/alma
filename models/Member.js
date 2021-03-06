var keystone = require('keystone');
var Types = keystone.Field.Types;

var Member = new keystone.List('Member', {
  track: true,
  searchFields: 'firstName lastName maidenName city',
  map: { name: 'lastName' },
  nodelete: true,
});

Member.add({
  title: { type: Types.Select, options: 'Ms., Mrs.', default: 'Mrs.', initial: true },
  firstName: { type: Types.Text },
  lastName: { type: Types.Text, required: true, initial: true },
  maidenName: { type: Types.Text },
  status: { type: Types.Select, options: 'active, inactive, deceased', default: 'active' },
  contactViaMail: { type: Boolean, default: false },
  contactViaEmail: { type: Boolean, default: false },
  skipNewsletter: { type: Boolean, default: false },
  apt: { type: Types.Text },
  address: { type: Types.Text },
  address2: { type: Types.Text },
  city: { type: Types.Text },
  province: { type: Types.Text },
  postalCode: { type: Types.Text },
  country: { type: Types.Text },
  phone: { type: Types.Text },
  husband: { type: Types.Text },
  startYear: { type: Types.Number },
  endYear: { type: Types.Number },
  email: { type: Types.Email },
  dateOfDeath: { type: Types.Text },
  change: { type: Types.Text },
  changeReason: { type: Types.Textarea },
  comments: { type: Types.Textarea },
});

Member.defaultSort = 'lastName';
Member.defaultColumns = 'lastName, firstName, maidenName, status';
Member.register();
