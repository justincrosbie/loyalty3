<<<<<<< HEAD

var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/loyalty3-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/loyalty3-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Test'
    }
  },
  production: {
    db: 'mongodb://jc:jc@ds063307.mongolab.com:63307/jcajs',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Production'
    }
  }
}
=======

var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/ngff-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/ngff-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Test'
    }
  },
  production: {
    db: 'mongodb://jc:jc@ds063307.mongolab.com:63307/jcajs',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Loyalty 3.0 - Production'
    }
  }
}
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
