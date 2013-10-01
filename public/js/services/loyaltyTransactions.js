window.angular.module('ngff.services.loyaltyTransactions', [])
  .factory('LoyaltyTransactions', ['$resource', 
    function($resource){
      return $resource(
        'loyaltyTransactions/:loyaltyTransactionId', 
        {
          loyaltyTransactionId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);