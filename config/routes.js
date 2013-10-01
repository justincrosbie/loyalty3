
var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  
  app.param('userId', users.user)
  
  // title routes
  var titles = require('../app/controllers/titles')  
  app.get('/titles', titles.all)
  app.post('/titles', auth.requiresLogin, titles.create)
  app.get('/titles/:titleId', titles.show)
  app.put('/titles/:titleId', auth.requiresLogin, titles.update)
  app.del('/titles/:titleId', auth.requiresLogin, titles.destroy)
 
  app.param('titleId', titles.title)

  // currency routes
  var currencys = require('../app/controllers/currencys')  
  app.get('/currencys', currencys.all)
  app.post('/currencys', auth.requiresLogin, currencys.create)
  app.get('/currencys/:currencyId', currencys.show)
  app.put('/currencys/:currencyId', auth.requiresLogin, currencys.update)
  app.del('/currencys/:currencyId', auth.requiresLogin, currencys.destroy)
 
  app.param('currencyId', currencys.currency)

  // country routes
  var countrys = require('../app/controllers/countrys')  
  app.get('/countrys', countrys.all)
  app.post('/countrys', auth.requiresLogin, countrys.create)
  app.get('/countrys/:countryId', countrys.show)
  app.put('/countrys/:countryId', auth.requiresLogin, countrys.update)
  app.del('/countrys/:countryId', auth.requiresLogin, countrys.destroy)
 
  app.param('countryId', countrys.country)

  // subscription routes
  var subscriptions = require('../app/controllers/subscriptions')  
  app.get('/subscriptions', subscriptions.all)
  app.post('/subscriptions', auth.requiresLogin, subscriptions.create)
  app.get('/subscriptions/:subscriptionId', subscriptions.show)
  app.put('/subscriptions/:subscriptionId', auth.requiresLogin, subscriptions.update)
  app.del('/subscriptions/:subscriptionId', auth.requiresLogin, subscriptions.destroy)
 
  app.param('subscriptionId', subscriptions.subscription)

  // customer routes
  var customers = require('../app/controllers/customers')  
  app.get('/customers', customers.all)
  app.post('/customers', auth.requiresLogin, customers.create)
  app.get('/customers/:customerId', customers.show)
  app.put('/customers/:customerId', auth.requiresLogin, customers.update)
  app.del('/customers/:customerId', auth.requiresLogin, customers.destroy)
 
  app.param('customerId', customers.customer)

  // site routes
  var sites = require('../app/controllers/sites')  
  app.get('/sites', sites.all)
  app.post('/sites', auth.requiresLogin, sites.create)
  app.get('/sites/:siteId', sites.show)
  app.put('/sites/:siteId', auth.requiresLogin, sites.update)
  app.del('/sites/:siteId', auth.requiresLogin, sites.destroy)
 
  app.param('siteId', sites.site)

  // company routes
  var companys = require('../app/controllers/companys')  
  app.get('/companys', companys.all)
  app.post('/companys', auth.requiresLogin, companys.create)
  app.get('/companys/:companyId', companys.show)
  app.put('/companys/:companyId', auth.requiresLogin, companys.update)
  app.del('/companys/:companyId', auth.requiresLogin, companys.destroy)
 
  app.param('companyId', companys.company)

  // person routes
  var persons = require('../app/controllers/persons')  
  app.get('/persons', persons.all)
  app.post('/persons', auth.requiresLogin, persons.create)
  app.get('/persons/:personId', persons.show)
  app.put('/persons/:personId', auth.requiresLogin, persons.update)
  app.del('/persons/:personId', auth.requiresLogin, persons.destroy)
 
  app.param('personId', persons.person)


  // rawperson routes
  var rawpersons = require('../app/controllers/rawpersons')  
  app.get('/rawpersons', rawpersons.all)
  app.post('/rawpersons', auth.requiresLogin, rawpersons.create)
  app.get('/rawpersons/:rawpersonId', rawpersons.show)
  app.put('/rawpersons/:rawpersonId', auth.requiresLogin, rawpersons.update)
  app.del('/rawpersons/:rawpersonId', auth.requiresLogin, rawpersons.destroy)
 
  app.param('rawpersonId', rawpersons.rawperson)

  // rawcompany routes
  var rawcompanys = require('../app/controllers/rawcompanys')  
  app.get('/rawcompanys', rawcompanys.all)
  app.post('/rawcompanys', auth.requiresLogin, rawcompanys.create)
  app.get('/rawcompanys/:rawcompanyId', rawcompanys.show)
  app.put('/rawcompanys/:rawcompanyId', auth.requiresLogin, rawcompanys.update)
  app.del('/rawcompanys/:rawcompanyId', auth.requiresLogin, rawcompanys.destroy)
 
  app.param('rawcompanyId', rawcompanys.rawcompany)

  // booking routes
  var bookings = require('../app/controllers/bookings')  
  app.get('/bookings', bookings.all)
  app.post('/bookings', auth.requiresLogin, bookings.create)
  app.get('/bookings/:bookingId', bookings.show)
  app.put('/bookings/:bookingId', auth.requiresLogin, bookings.update)
  app.del('/bookings/:bookingId', auth.requiresLogin, bookings.destroy)
 
  app.param('bookingId', bookings.booking)

  // revenue routes
  var revenues = require('../app/controllers/revenues')  
  app.get('/revenues', revenues.all)
  app.post('/revenues', auth.requiresLogin, revenues.create)
  app.get('/revenues/:revenueId', revenues.show)
  app.put('/revenues/:revenueId', auth.requiresLogin, revenues.update)
  app.del('/revenues/:revenueId', auth.requiresLogin, revenues.destroy)
 
  app.param('revenueId', revenues.revenue)


  // Loyalty 3.0

  // loyaltyScheme routes
  var loyaltySchemes = require('../app/controllers/loyaltySchemes')  
  app.get('/loyaltySchemes', loyaltySchemes.all)
  app.post('/loyaltySchemes', auth.requiresLogin, loyaltySchemes.create)
  app.get('/loyaltySchemes/:loyaltySchemeId', loyaltySchemes.show)
  app.put('/loyaltySchemes/:loyaltySchemeId', auth.requiresLogin, loyaltySchemes.update)
  app.del('/loyaltySchemes/:loyaltySchemeId', auth.requiresLogin, loyaltySchemes.destroy)
 
  app.param('loyaltySchemeId', loyaltySchemes.loyaltyScheme)

  // loyaltyMember routes
  var loyaltyMembers = require('../app/controllers/loyaltyMembers')  
  app.get('/loyaltyMembers', loyaltyMembers.all)
  app.post('/loyaltyMembers', auth.requiresLogin, loyaltyMembers.create)
  app.get('/loyaltyMembers/:loyaltyMemberId', loyaltyMembers.show)
  app.put('/loyaltyMembers/:loyaltyMemberId', auth.requiresLogin, loyaltyMembers.update)
  app.del('/loyaltyMembers/:loyaltyMemberId', auth.requiresLogin, loyaltyMembers.destroy)
 
  app.param('loyaltyMemberId', loyaltyMembers.loyaltyMember)

  // loyaltyPoint routes
  var loyaltyPoints = require('../app/controllers/loyaltyPoints')  
  app.get('/loyaltyPoints', loyaltyPoints.all)
  app.post('/loyaltyPoints', auth.requiresLogin, loyaltyPoints.create)
  app.get('/loyaltyPoints/:loyaltyPointId', loyaltyPoints.show)
  app.put('/loyaltyPoints/:loyaltyPointId', auth.requiresLogin, loyaltyPoints.update)
  app.del('/loyaltyPoints/:loyaltyPointId', auth.requiresLogin, loyaltyPoints.destroy)
 
  app.param('loyaltyPointId', loyaltyPoints.loyaltyPoint)

  // loyaltyTransaction routes
  var loyaltyTransactions = require('../app/controllers/loyaltyTransactions')  
  app.get('/loyaltyTransactions', loyaltyTransactions.all)
  app.post('/loyaltyTransactions', auth.requiresLogin, loyaltyTransactions.create)
  app.get('/loyaltyTransactions/:loyaltyTransactionId', loyaltyTransactions.show)
  app.put('/loyaltyTransactions/:loyaltyTransactionId', auth.requiresLogin, loyaltyTransactions.update)
  app.del('/loyaltyTransactions/:loyaltyTransactionId', auth.requiresLogin, loyaltyTransactions.destroy)
 
  app.param('loyaltyTransactionId', loyaltyTransactions.loyaltyTransaction)

  // loyaltyStatement routes
  var loyaltyStatements = require('../app/controllers/loyaltyStatements')  
  app.get('/loyaltyStatements', loyaltyStatements.all)
  app.post('/loyaltyStatements', auth.requiresLogin, loyaltyStatements.create)
  app.get('/loyaltyStatements/:loyaltyStatementId', loyaltyStatements.show)
  app.put('/loyaltyStatements/:loyaltyStatementId', auth.requiresLogin, loyaltyStatements.update)
  app.del('/loyaltyStatements/:loyaltyStatementId', auth.requiresLogin, loyaltyStatements.destroy)
 
  app.param('loyaltyStatementId', loyaltyStatements.loyaltyStatement)

      // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
