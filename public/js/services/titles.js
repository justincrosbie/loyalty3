<<<<<<< HEAD
window.angular.module('ngff.services.titles', [])
  .factory('Titles', ['$resource', 
    function($resource){
      return $resource(
        'titles/:titleId', 
        {
          titleId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
=======
window.angular.module('ngff.services.titles', [])
  .factory('Titles', ['$resource', 
    function($resource){
      return $resource(
        'titles/:titleId', 
        {
          titleId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);