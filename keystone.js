// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

keystone.init({
  'name': 'Alma',
  'brand': 'Alma',

  'sass': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': '.hbs',
  'signin logo': ['/images/logo.jpg', 200, 113],
  'cookie secret': process.env.COOKIE_SECRET,

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: new require('./templates/views/helpers')(),
    extname: '.hbs',
  }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
  people: ['users', 'members'],
});

keystone.start();
