window.angular.module('ngff.services.loyaltySchemes', [])
  .factory('LoyaltySchemes', ['$resource', 
    function($resource){
      return $resource(
        'loyaltySchemes/:loyaltySchemeId', 
        {
          loyaltySchemeId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);