window.angular.module('ngff.services.loyaltyTransactions', [])
  .factory('LoyaltyTransactions', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyTransactions/:loyaltyTransactionId', 
        {
          loyaltyTransactionId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);