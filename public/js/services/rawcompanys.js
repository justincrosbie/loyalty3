window.angular.module('ngff.services.Rawcompanys', [])
  .factory('Rawcompanys', ['$resource', 
    function($resource){
      return $resource(
        'Rawcompanys/:RawcompanyId', 
        {
          RawcompanyId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);