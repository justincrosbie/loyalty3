window.angular.module('ngff.services.datasourcetypes', [])
  .factory('Datasourcetypes', ['$resource', 
    function($resource){
      return $resource(
        'datasourcetypes/:datasourcetypeId', 
        {
          datasourcetypeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);