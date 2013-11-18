window.angular.module('ngff.services.customers', [])
  .factory('Customers', ['$resource', 
    function($resource){
      return $resource(
        'customers/:customerId', 
        {
          customerId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);