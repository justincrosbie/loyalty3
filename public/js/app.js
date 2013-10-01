window.app = angular.module('loyalty3', ['ngCookies', 'ngResource', 'ui.bootstrap', '$strap.directives', 'ngRoute', 'ngAnimate', 
										'ngff.controllers', 'ngff.directives', 'ngff.services']);

// bundling dependencies
window.angular.module('ngff.controllers', 
										[
											'ngff.controllers.header', 
											'ngff.controllers.index', 
											'ngff.controllers.titles', 
											'ngff.controllers.currencys', 
											'ngff.controllers.countrys', 
											'ngff.controllers.subscriptions', 
											'ngff.controllers.customers', 
											'ngff.controllers.sites', 
											'ngff.controllers.companys', 
											'ngff.controllers.persons', 
											'ngff.controllers.rawcompanys', 
											'ngff.controllers.rawpersons', 
											'ngff.controllers.bookings', 
											'ngff.controllers.revenues', 
											'ngff.controllers.loyaltySchemes', 
											'ngff.controllers.loyaltyMembers', 
											'ngff.controllers.loyaltyPoints', 
											'ngff.controllers.loyaltyTransactions', 
											'ngff.controllers.loyaltyStatements'
										]);
window.angular.module('ngff.services',
										[
											'ngff.services.global',
											'ngff.services.titles',
											'ngff.services.currencys',
											'ngff.services.countrys',
											'ngff.services.subscriptions',
											'ngff.services.customers',
											'ngff.services.sites',
											'ngff.services.companys',
											'ngff.services.persons',
											'ngff.services.rawcompanys',
											'ngff.services.rawpersons',
											'ngff.services.bookings',
											'ngff.services.revenues',
											'ngff.services.loyaltySchemes',
											'ngff.services.loyaltyMembers',
											'ngff.services.loyaltyPoints',
											'ngff.services.loyaltyTransactions',
											'ngff.services.loyaltyStatements'
										]);