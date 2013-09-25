
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
      name: 'loyalty3 - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/ngff-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'loyalty3 - Test'
    }
  },
  production: {
    db: 'mongodb://jc:jc@ds063307.mongolab.com:63307/jcajs',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'loyalty3 - Production'
    }
  }
}
