window.angular.module('ngff.services.persons', [])
  .factory('Persons', ['$resource', 
    function($resource){
      return $resource(
        'persons/:personId', 
        {
          personId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);