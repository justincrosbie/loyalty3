window.angular.module('ngff.services.customers', [])
  .factory('Customers', ['$resource', 
    function($resource){
      return $resource(
        'customers/:customerId', 
        {
          customerId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);