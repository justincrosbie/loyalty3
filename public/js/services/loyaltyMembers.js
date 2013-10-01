window.angular.module('ngff.services.loyaltyMembers', [])
  .factory('LoyaltyMembers', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyMembers/:loyaltyMemberId', 
        {
          loyaltyMemberId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);