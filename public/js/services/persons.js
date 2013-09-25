window.angular.module('ngff.services.persons', [])
  .factory('Persons', ['$resource', 
    function($resource){
      return $resource(
        'persons/:personId', 
        {
          personId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);