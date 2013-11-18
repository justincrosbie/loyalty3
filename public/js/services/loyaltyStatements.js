window.angular.module('ngff.services.loyaltyStatements', [])
  .factory('LoyaltyStatements', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyStatements/:loyaltyStatementId', 
        {
          loyaltyStatementId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);