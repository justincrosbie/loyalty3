window.angular.module('ngff.services.revenues', [])
  .factory('Revenues', ['$resource', 
    function($resource){
      return $resource(
        'revenues/:revenueId', 
        {
          revenueId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);