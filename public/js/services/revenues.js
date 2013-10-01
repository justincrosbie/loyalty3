window.angular.module('ngff.services.revenues', [])
  .factory('Revenue', ['$resource', 
    function($resource){
      return $resource(
        'revenues/:revenueId', 
        {
          revenueId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);