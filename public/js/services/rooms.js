window.angular.module('ngff.services.rooms', [])
  .factory('Rooms', ['$resource', 
    function($resource){
      return $resource(
        'rooms/:roomId', 
        {
          roomId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);