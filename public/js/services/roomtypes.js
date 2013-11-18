window.angular.module('ngff.services.roomtypes', [])
  .factory('Roomtypes', ['$resource', 
    function($resource){
      return $resource(
        'roomtypes/:roomtypeId', 
        {
          roomtypeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);