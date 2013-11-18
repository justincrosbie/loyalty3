window.angular.module('ngff.services.datasources', [])
  .factory('Datasources', ['$resource', 
    function($resource){
      return $resource(
        'datasources/:datasourceId', 
        {
          datasourceId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);