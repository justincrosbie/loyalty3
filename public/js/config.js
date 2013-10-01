//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', 
  { 
    templateUrl: 'views/index.html' 
  })

  .when('/titles', 
  {
    templateUrl: 'views/titles/list.html'
  })
  .when('/titles/create', 
  { 
    templateUrl: 'views/titles/create.html' 
  })  
  .when('/titles/:titleId/edit', 
  { 
    templateUrl: 'views/titles/edit.html' 
  })
  .when('/titles/:titleId', 
  { 
    templateUrl: 'views/titles/view.html' 
  })
  
  .when('/currencys', 
  {
    templateUrl: 'views/currencys/list.html'
  })
  .when('/currencys/create', 
  { 
    templateUrl: 'views/currencys/create.html' 
  })  
  .when('/currencys/:currencyId/edit', 
  { 
    templateUrl: 'views/currencys/edit.html' 
  })
  .when('/currencys/:currencyId', 
  { 
    templateUrl: 'views/currencys/view.html' 
  })

  .when('/countrys', 
  {
    templateUrl: 'views/countrys/list.html'
  })
  .when('/countrys/create', 
  { 
    templateUrl: 'views/countrys/create.html' 
  })  
  .when('/countrys/:countryId/edit', 
  { 
    templateUrl: 'views/countrys/edit.html' 
  })
  .when('/countrys/:countryId', 
  { 
    templateUrl: 'views/countrys/view.html' 
  })
    
  .when('/subscriptions', 
  {
    templateUrl: 'views/subscriptions/list.html'
  })
  .when('/subscriptions/create', 
  { 
    templateUrl: 'views/subscriptions/create.html' 
  })  
  .when('/subscriptions/:subscriptionId/edit', 
  { 
    templateUrl: 'views/subscriptions/edit.html' 
  })
  .when('/subscriptions/:subscriptionId', 
  { 
    templateUrl: 'views/subscriptions/view.html' 
  })
  
  .when('/customers', 
  {
    templateUrl: 'views/customers/list.html'
  })
  .when('/customers/create', 
  { 
    templateUrl: 'views/customers/create.html' 
  })  
  .when('/customers/:customerId/edit', 
  { 
    templateUrl: 'views/customers/edit.html' 
  })
  .when('/customers/:customerId', 
  { 
    templateUrl: 'views/customers/view.html' 
  })
  
  .when('/sites', 
  {
    templateUrl: 'views/sites/list.html'
  })
  .when('/sites/create', 
  { 
    templateUrl: 'views/sites/create.html' 
  })  
  .when('/sites/:siteId/edit', 
  { 
    templateUrl: 'views/sites/edit.html' 
  })
  .when('/sites/:siteId', 
  { 
    templateUrl: 'views/sites/view.html' 
  })
  
  .when('/companys', 
  {
    templateUrl: 'views/companys/list.html'
  })
  .when('/companys/create', 
  { 
    templateUrl: 'views/companys/create.html' 
  })  
  .when('/companys/:companyId/edit', 
  { 
    templateUrl: 'views/companys/edit.html' 
  })
  .when('/companys/:companyId', 
  { 
    templateUrl: 'views/companys/view.html' 
  })
  
  .when('/persons', 
  {
    templateUrl: 'views/persons/list.html'
  })
  .when('/persons/create', 
  { 
    templateUrl: 'views/persons/create.html' 
  })  
  .when('/persons/:personId/edit', 
  { 
    templateUrl: 'views/persons/edit.html' 
  })
  .when('/persons/:personId', 
  { 
    templateUrl: 'views/persons/view.html' 
  })
  
  .when('/rawpersons', 
  {
    templateUrl: 'views/rawpersons/list.html'
  })
  .when('/rawpersons/create', 
  { 
    templateUrl: 'views/rawpersons/create.html' 
  })  
  .when('/rawpersons/:rawpersonId/edit', 
  { 
    templateUrl: 'views/rawpersons/edit.html' 
  })
  .when('/rawpersons/:rawpersonId', 
  { 
    templateUrl: 'views/rawpersons/view.html' 
  })

  .when('/rawcompanys', 
  {
    templateUrl: 'views/rawcompanys/list.html'
  })
  .when('/rawcompanys/create', 
  { 
    templateUrl: 'views/rawcompanys/create.html' 
  })  
  .when('/rawcompanys/:rawcompanyId/edit', 
  { 
    templateUrl: 'views/rawcompanys/edit.html' 
  })
  .when('/rawcompanys/:rawcompanyId', 
  { 
    templateUrl: 'views/rawcompanys/view.html' 
  })

  .when('/bookings', 
  {
    templateUrl: 'views/bookings/list.html'
  })
  .when('/bookings/create', 
  { 
    templateUrl: 'views/bookings/create.html' 
  })  
  .when('/bookings/:bookingId/edit', 
  { 
    templateUrl: 'views/bookings/edit.html' 
  })
  .when('/bookings/:bookingId', 
  { 
    templateUrl: 'views/bookings/view.html' 
  })

  .when('/revenues', 
  {
    templateUrl: 'views/revenues/list.html'
  })
  .when('/revenues/create', 
  { 
    templateUrl: 'views/revenues/create.html' 
  })  
  .when('/revenues/:revenueId/edit', 
  { 
    templateUrl: 'views/revenues/edit.html' 
  })
  .when('/revenues/:revenueId', 
  { 
    templateUrl: 'views/revenues/view.html' 
  })

  .when('/loyaltySchemes', 
  {
    templateUrl: 'views/loyaltySchemes/list.html'
  })
  .when('/loyaltySchemes/create', 
  { 
    templateUrl: 'views/loyaltySchemes/create.html' 
  })  
  .when('/loyaltySchemes/:loyaltySchemeId/edit', 
  { 
    templateUrl: 'views/loyaltySchemes/edit.html' 
  })
  .when('/loyaltySchemes/:loyaltySchemeId', 
  { 
    templateUrl: 'views/loyaltySchemes/view.html' 
  })
  
  .when('/loyaltyMembers', 
  {
    templateUrl: 'views/loyaltyMembers/list.html'
  })
  .when('/loyaltyMembers/create', 
  { 
    templateUrl: 'views/loyaltyMembers/create.html' 
  })  
  .when('/loyaltyMembers/:loyaltyMemberId/edit', 
  { 
    templateUrl: 'views/loyaltyMembers/edit.html' 
  })
  .when('/loyaltyMembers/:loyaltyMemberId', 
  { 
    templateUrl: 'views/loyaltyMembers/view.html' 
  })
  
  .when('/loyaltyPoints', 
  {
    templateUrl: 'views/loyaltyPoints/list.html'
  })
  .when('/loyaltyPoints/create', 
  { 
    templateUrl: 'views/loyaltyPoints/create.html' 
  })  
  .when('/loyaltyPoints/:loyaltyPointId/edit', 
  { 
    templateUrl: 'views/loyaltyPoints/edit.html' 
  })
  .when('/loyaltyPoints/:loyaltyPointId', 
  { 
    templateUrl: 'views/loyaltyPoints/view.html' 
  })
  
  .when('/loyaltyTransactions', 
  {
    templateUrl: 'views/loyaltyTransactions/list.html'
  })
  .when('/loyaltyTransactions/create', 
  { 
    templateUrl: 'views/loyaltyTransactions/create.html' 
  })  
  .when('/loyaltyTransactions/:loyaltyTransactionId/edit', 
  { 
    templateUrl: 'views/loyaltyTransactions/edit.html' 
  })
  .when('/loyaltyTransactions/:loyaltyTransactionId', 
  { 
    templateUrl: 'views/loyaltyTransactions/view.html' 
  })
  
  .when('/loyaltyStatements', 
  {
    templateUrl: 'views/loyaltyStatements/list.html'
  })
  .when('/loyaltyStatements/create', 
  { 
    templateUrl: 'views/loyaltyStatements/create.html' 
  })  
  .when('/loyaltyStatements/:loyaltyStatementId/edit', 
  { 
    templateUrl: 'views/loyaltyStatements/edit.html' 
  })
  .when('/loyaltyStatements/:loyaltyStatementId', 
  { 
    templateUrl: 'views/loyaltyStatements/view.html' 
  })
  
    .otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);