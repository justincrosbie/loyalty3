
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
  

  
  // customer routes
  var customers = require('../app/controllers/customers')  
  app.get('/customers', customers.query)
  app.get('/customers/count', customers.queryCount)
  app.post('/customers', auth.requiresLogin, customers.create)
  app.get('/customers/:customerId', customers.show)
  app.put('/customers/:customerId', auth.requiresLogin, customers.update)
  app.del('/customers/:customerId', auth.requiresLogin, customers.destroy)
 
  app.param('customerId', customers.customer)
  
  // site routes
  var sites = require('../app/controllers/sites')  
  app.get('/sites', sites.query)
  app.get('/sites/count', sites.queryCount)
  app.post('/sites', auth.requiresLogin, sites.create)
  app.get('/sites/:siteId', sites.show)
  app.put('/sites/:siteId', auth.requiresLogin, sites.update)
  app.del('/sites/:siteId', auth.requiresLogin, sites.destroy)
 
  app.param('siteId', sites.site)
  
  // datasourcetype routes
  var datasourcetypes = require('../app/controllers/datasourcetypes')  
  app.get('/datasourcetypes', datasourcetypes.query)
  app.get('/datasourcetypes/count', datasourcetypes.queryCount)
  app.post('/datasourcetypes', auth.requiresLogin, datasourcetypes.create)
  app.get('/datasourcetypes/:datasourcetypeId', datasourcetypes.show)
  app.put('/datasourcetypes/:datasourcetypeId', auth.requiresLogin, datasourcetypes.update)
  app.del('/datasourcetypes/:datasourcetypeId', auth.requiresLogin, datasourcetypes.destroy)
 
  app.param('datasourcetypeId', datasourcetypes.datasourcetype)
  
  // datasource routes
  var datasources = require('../app/controllers/datasources')  
  app.get('/datasources', datasources.query)
  app.get('/datasources/count', datasources.queryCount)
  app.post('/datasources', auth.requiresLogin, datasources.create)
  app.get('/datasources/:datasourceId', datasources.show)
  app.put('/datasources/:datasourceId', auth.requiresLogin, datasources.update)
  app.del('/datasources/:datasourceId', auth.requiresLogin, datasources.destroy)
 
  app.param('datasourceId', datasources.datasource)
  
  // subscription routes
  var subscriptions = require('../app/controllers/subscriptions')  
  app.get('/subscriptions', subscriptions.query)
  app.get('/subscriptions/count', subscriptions.queryCount)
  app.post('/subscriptions', auth.requiresLogin, subscriptions.create)
  app.get('/subscriptions/:subscriptionId', subscriptions.show)
  app.put('/subscriptions/:subscriptionId', auth.requiresLogin, subscriptions.update)
  app.del('/subscriptions/:subscriptionId', auth.requiresLogin, subscriptions.destroy)
 
  app.param('subscriptionId', subscriptions.subscription)
  
  // title routes
  var titles = require('../app/controllers/titles')  
  app.get('/titles', titles.query)
  app.get('/titles/count', titles.queryCount)
  app.post('/titles', auth.requiresLogin, titles.create)
  app.get('/titles/:titleId', titles.show)
  app.put('/titles/:titleId', auth.requiresLogin, titles.update)
  app.del('/titles/:titleId', auth.requiresLogin, titles.destroy)
 
  app.param('titleId', titles.title)
  
  // country routes
  var countrys = require('../app/controllers/countrys')  
  app.get('/countrys', countrys.query)
  app.get('/countrys/count', countrys.queryCount)
  app.post('/countrys', auth.requiresLogin, countrys.create)
  app.get('/countrys/:countryId', countrys.show)
  app.put('/countrys/:countryId', auth.requiresLogin, countrys.update)
  app.del('/countrys/:countryId', auth.requiresLogin, countrys.destroy)
 
  app.param('countryId', countrys.country)
  
  // currency routes
  var currencys = require('../app/controllers/currencys')  
  app.get('/currencys', currencys.query)
  app.get('/currencys/count', currencys.queryCount)
  app.post('/currencys', auth.requiresLogin, currencys.create)
  app.get('/currencys/:currencyId', currencys.show)
  app.put('/currencys/:currencyId', auth.requiresLogin, currencys.update)
  app.del('/currencys/:currencyId', auth.requiresLogin, currencys.destroy)
 
  app.param('currencyId', currencys.currency)
  
  // bookingstatus routes
  var bookingstatuss = require('../app/controllers/bookingstatuss')  
  app.get('/bookingstatuss', bookingstatuss.query)
  app.get('/bookingstatuss/count', bookingstatuss.queryCount)
  app.post('/bookingstatuss', auth.requiresLogin, bookingstatuss.create)
  app.get('/bookingstatuss/:bookingstatusId', bookingstatuss.show)
  app.put('/bookingstatuss/:bookingstatusId', auth.requiresLogin, bookingstatuss.update)
  app.del('/bookingstatuss/:bookingstatusId', auth.requiresLogin, bookingstatuss.destroy)
 
  app.param('bookingstatusId', bookingstatuss.bookingstatus)
  
  // bookingtype routes
  var bookingtypes = require('../app/controllers/bookingtypes')  
  app.get('/bookingtypes', bookingtypes.query)
  app.get('/bookingtypes/count', bookingtypes.queryCount)
  app.post('/bookingtypes', auth.requiresLogin, bookingtypes.create)
  app.get('/bookingtypes/:bookingtypeId', bookingtypes.show)
  app.put('/bookingtypes/:bookingtypeId', auth.requiresLogin, bookingtypes.update)
  app.del('/bookingtypes/:bookingtypeId', auth.requiresLogin, bookingtypes.destroy)
 
  app.param('bookingtypeId', bookingtypes.bookingtype)
  
  // ratecode routes
  var ratecodes = require('../app/controllers/ratecodes')  
  app.get('/ratecodes', ratecodes.query)
  app.get('/ratecodes/count', ratecodes.queryCount)
  app.post('/ratecodes', auth.requiresLogin, ratecodes.create)
  app.get('/ratecodes/:ratecodeId', ratecodes.show)
  app.put('/ratecodes/:ratecodeId', auth.requiresLogin, ratecodes.update)
  app.del('/ratecodes/:ratecodeId', auth.requiresLogin, ratecodes.destroy)
 
  app.param('ratecodeId', ratecodes.ratecode)
  
  // marketcode routes
  var marketcodes = require('../app/controllers/marketcodes')  
  app.get('/marketcodes', marketcodes.query)
  app.get('/marketcodes/count', marketcodes.queryCount)
  app.post('/marketcodes', auth.requiresLogin, marketcodes.create)
  app.get('/marketcodes/:marketcodeId', marketcodes.show)
  app.put('/marketcodes/:marketcodeId', auth.requiresLogin, marketcodes.update)
  app.del('/marketcodes/:marketcodeId', auth.requiresLogin, marketcodes.destroy)
 
  app.param('marketcodeId', marketcodes.marketcode)
  
  // channel routes
  var channels = require('../app/controllers/channels')  
  app.get('/channels', channels.query)
  app.get('/channels/count', channels.queryCount)
  app.post('/channels', auth.requiresLogin, channels.create)
  app.get('/channels/:channelId', channels.show)
  app.put('/channels/:channelId', auth.requiresLogin, channels.update)
  app.del('/channels/:channelId', auth.requiresLogin, channels.destroy)
 
  app.param('channelId', channels.channel)
  
  // sob routes
  var sobs = require('../app/controllers/sobs')  
  app.get('/sobs', sobs.query)
  app.get('/sobs/count', sobs.queryCount)
  app.post('/sobs', auth.requiresLogin, sobs.create)
  app.get('/sobs/:sobId', sobs.show)
  app.put('/sobs/:sobId', auth.requiresLogin, sobs.update)
  app.del('/sobs/:sobId', auth.requiresLogin, sobs.destroy)
 
  app.param('sobId', sobs.sob)
  
  // roomtype routes
  var roomtypes = require('../app/controllers/roomtypes')  
  app.get('/roomtypes', roomtypes.query)
  app.get('/roomtypes/count', roomtypes.queryCount)
  app.post('/roomtypes', auth.requiresLogin, roomtypes.create)
  app.get('/roomtypes/:roomtypeId', roomtypes.show)
  app.put('/roomtypes/:roomtypeId', auth.requiresLogin, roomtypes.update)
  app.del('/roomtypes/:roomtypeId', auth.requiresLogin, roomtypes.destroy)
 
  app.param('roomtypeId', roomtypes.roomtype)
  
  // room routes
  var rooms = require('../app/controllers/rooms')  
  app.get('/rooms', rooms.query)
  app.get('/rooms/count', rooms.queryCount)
  app.post('/rooms', auth.requiresLogin, rooms.create)
  app.get('/rooms/:roomId', rooms.show)
  app.put('/rooms/:roomId', auth.requiresLogin, rooms.update)
  app.del('/rooms/:roomId', auth.requiresLogin, rooms.destroy)
 
  app.param('roomId', rooms.room)
  
  // rawcompany routes
  var rawcompanys = require('../app/controllers/rawcompanys')  
  app.get('/rawcompanys', rawcompanys.query)
  app.get('/rawcompanys/count', rawcompanys.queryCount)
  app.post('/rawcompanys', auth.requiresLogin, rawcompanys.create)
  app.get('/rawcompanys/:rawcompanyId', rawcompanys.show)
  app.put('/rawcompanys/:rawcompanyId', auth.requiresLogin, rawcompanys.update)
  app.del('/rawcompanys/:rawcompanyId', auth.requiresLogin, rawcompanys.destroy)
 
  app.param('rawcompanyId', rawcompanys.rawcompany)
  
  // rawperson routes
  var rawpersons = require('../app/controllers/rawpersons')  
  app.get('/rawpersons', rawpersons.query)
  app.get('/rawpersons/count', rawpersons.queryCount)
  app.post('/rawpersons', auth.requiresLogin, rawpersons.create)
  app.get('/rawpersons/:rawpersonId', rawpersons.show)
  app.put('/rawpersons/:rawpersonId', auth.requiresLogin, rawpersons.update)
  app.del('/rawpersons/:rawpersonId', auth.requiresLogin, rawpersons.destroy)
 
  app.param('rawpersonId', rawpersons.rawperson)
  
  // booking routes
  var bookings = require('../app/controllers/bookings')  
  app.get('/bookings', bookings.query)
  app.get('/bookings/count', bookings.queryCount)
  app.post('/bookings', auth.requiresLogin, bookings.create)
  app.get('/bookings/:bookingId', bookings.show)
  app.put('/bookings/:bookingId', auth.requiresLogin, bookings.update)
  app.del('/bookings/:bookingId', auth.requiresLogin, bookings.destroy)
 
  app.param('bookingId', bookings.booking)
  
  // paymenttype routes
  var paymenttypes = require('../app/controllers/paymenttypes')  
  app.get('/paymenttypes', paymenttypes.query)
  app.get('/paymenttypes/count', paymenttypes.queryCount)
  app.post('/paymenttypes', auth.requiresLogin, paymenttypes.create)
  app.get('/paymenttypes/:paymenttypeId', paymenttypes.show)
  app.put('/paymenttypes/:paymenttypeId', auth.requiresLogin, paymenttypes.update)
  app.del('/paymenttypes/:paymenttypeId', auth.requiresLogin, paymenttypes.destroy)
 
  app.param('paymenttypeId', paymenttypes.paymenttype)
  
  // revenuetype routes
  var revenuetypes = require('../app/controllers/revenuetypes')  
  app.get('/revenuetypes', revenuetypes.query)
  app.get('/revenuetypes/count', revenuetypes.queryCount)
  app.post('/revenuetypes', auth.requiresLogin, revenuetypes.create)
  app.get('/revenuetypes/:revenuetypeId', revenuetypes.show)
  app.put('/revenuetypes/:revenuetypeId', auth.requiresLogin, revenuetypes.update)
  app.del('/revenuetypes/:revenuetypeId', auth.requiresLogin, revenuetypes.destroy)
 
  app.param('revenuetypeId', revenuetypes.revenuetype)
  
  // revenuecode routes
  var revenuecodes = require('../app/controllers/revenuecodes')  
  app.get('/revenuecodes', revenuecodes.query)
  app.get('/revenuecodes/count', revenuecodes.queryCount)
  app.post('/revenuecodes', auth.requiresLogin, revenuecodes.create)
  app.get('/revenuecodes/:revenuecodeId', revenuecodes.show)
  app.put('/revenuecodes/:revenuecodeId', auth.requiresLogin, revenuecodes.update)
  app.del('/revenuecodes/:revenuecodeId', auth.requiresLogin, revenuecodes.destroy)
 
  app.param('revenuecodeId', revenuecodes.revenuecode)
  
  // revenue routes
  var revenues = require('../app/controllers/revenues')  
  app.get('/revenues', revenues.query)
  app.get('/revenues/count', revenues.queryCount)
  app.post('/revenues', auth.requiresLogin, revenues.create)
  app.get('/revenues/:revenueId', revenues.show)
  app.put('/revenues/:revenueId', auth.requiresLogin, revenues.update)
  app.del('/revenues/:revenueId', auth.requiresLogin, revenues.destroy)
 
  app.param('revenueId', revenues.revenue)
  
  // company routes
  var companys = require('../app/controllers/companys')  
  app.get('/companys', companys.query)
  app.get('/companys/count', companys.queryCount)
  app.post('/companys', auth.requiresLogin, companys.create)
  app.get('/companys/:companyId', companys.show)
  app.put('/companys/:companyId', auth.requiresLogin, companys.update)
  app.del('/companys/:companyId', auth.requiresLogin, companys.destroy)
 
  app.param('companyId', companys.company)
  
  // person routes
  var persons = require('../app/controllers/persons')  
  app.get('/persons', persons.query)
  app.get('/persons/count', persons.queryCount)
  app.post('/persons', auth.requiresLogin, persons.create)
  app.get('/persons/:personId', persons.show)
  app.put('/persons/:personId', auth.requiresLogin, persons.update)
  app.del('/persons/:personId', auth.requiresLogin, persons.destroy)
 
  app.param('personId', persons.person)
  
  // loyaltyScheme routes
  var loyaltySchemes = require('../app/controllers/loyaltySchemes')  
  app.get('/loyaltySchemes', loyaltySchemes.query)
  app.get('/loyaltySchemes/count', loyaltySchemes.queryCount)
  app.post('/loyaltySchemes', auth.requiresLogin, loyaltySchemes.create)
  app.get('/loyaltySchemes/:loyaltySchemeId', loyaltySchemes.show)
  app.put('/loyaltySchemes/:loyaltySchemeId', auth.requiresLogin, loyaltySchemes.update)
  app.del('/loyaltySchemes/:loyaltySchemeId', auth.requiresLogin, loyaltySchemes.destroy)
 
  app.param('loyaltySchemeId', loyaltySchemes.loyaltyScheme)
  
  // loyaltyMember routes
  var loyaltyMembers = require('../app/controllers/loyaltyMembers')  
  app.get('/loyaltyMembers', loyaltyMembers.query)
  app.get('/loyaltyMembers/count', loyaltyMembers.queryCount)
  app.post('/loyaltyMembers', auth.requiresLogin, loyaltyMembers.create)
  app.get('/loyaltyMembers/:loyaltyMemberId', loyaltyMembers.show)
  app.put('/loyaltyMembers/:loyaltyMemberId', auth.requiresLogin, loyaltyMembers.update)
  app.del('/loyaltyMembers/:loyaltyMemberId', auth.requiresLogin, loyaltyMembers.destroy)
 
  app.param('loyaltyMemberId', loyaltyMembers.loyaltyMember)
  
  // loyaltyPoint routes
  var loyaltyPoints = require('../app/controllers/loyaltyPoints')  
  app.get('/loyaltyPoints', loyaltyPoints.query)
  app.get('/loyaltyPoints/count', loyaltyPoints.queryCount)
  app.post('/loyaltyPoints', auth.requiresLogin, loyaltyPoints.create)
  app.get('/loyaltyPoints/:loyaltyPointId', loyaltyPoints.show)
  app.put('/loyaltyPoints/:loyaltyPointId', auth.requiresLogin, loyaltyPoints.update)
  app.del('/loyaltyPoints/:loyaltyPointId', auth.requiresLogin, loyaltyPoints.destroy)
 
  app.param('loyaltyPointId', loyaltyPoints.loyaltyPoint)
  
  // loyaltyStatement routes
  var loyaltyStatements = require('../app/controllers/loyaltyStatements')  
  app.get('/loyaltyStatements', loyaltyStatements.query)
  app.get('/loyaltyStatements/count', loyaltyStatements.queryCount)
  app.post('/loyaltyStatements', auth.requiresLogin, loyaltyStatements.create)
  app.get('/loyaltyStatements/:loyaltyStatementId', loyaltyStatements.show)
  app.put('/loyaltyStatements/:loyaltyStatementId', auth.requiresLogin, loyaltyStatements.update)
  app.del('/loyaltyStatements/:loyaltyStatementId', auth.requiresLogin, loyaltyStatements.destroy)
 
  app.param('loyaltyStatementId', loyaltyStatements.loyaltyStatement)
  
  // loyaltyTransaction routes
  var loyaltyTransactions = require('../app/controllers/loyaltyTransactions')  
  app.get('/loyaltyTransactions', loyaltyTransactions.query)
  app.get('/loyaltyTransactions/count', loyaltyTransactions.queryCount)
  app.post('/loyaltyTransactions', auth.requiresLogin, loyaltyTransactions.create)
  app.get('/loyaltyTransactions/:loyaltyTransactionId', loyaltyTransactions.show)
  app.put('/loyaltyTransactions/:loyaltyTransactionId', auth.requiresLogin, loyaltyTransactions.update)
  app.del('/loyaltyTransactions/:loyaltyTransactionId', auth.requiresLogin, loyaltyTransactions.destroy)
 
  app.param('loyaltyTransactionId', loyaltyTransactions.loyaltyTransaction)
  

      // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
