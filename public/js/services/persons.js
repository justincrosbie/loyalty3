<<<<<<< HEAD
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
=======
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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);