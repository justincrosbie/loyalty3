window.angular.module('ngff.services.revenuetypes', [])
  .factory('Revenuetypes', ['$resource', 
    function($resource){
      return $resource(
        'revenuetypes/:revenuetypeId', 
        {
          revenuetypeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);