window.angular.module('ngff.services.loyaltyPoints', [])
  .factory('LoyaltyPoints', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyPoints/:loyaltyPointId', 
        {
          loyaltyPointId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);