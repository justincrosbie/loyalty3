window.angular.module('ngff.services.sobs', [])
  .factory('Sobs', ['$resource', 
    function($resource){
      return $resource(
        'sobs/:sobId', 
        {
          sobId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);