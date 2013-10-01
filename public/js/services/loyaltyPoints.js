window.angular.module('ngff.services.loyaltyPoints', [])
  .factory('LoyaltyPoints', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyPoints/:loyaltyPointId', 
        {
          loyaltyPointId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);