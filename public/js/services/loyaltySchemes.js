window.angular.module('ngff.services.loyaltySchemes', [])
  .factory('LoyaltySchemes', ['$resource', 
    function($resource){
      return $resource(
        'loyaltySchemes/:loyaltySchemeId', 
        {
          loyaltySchemeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);