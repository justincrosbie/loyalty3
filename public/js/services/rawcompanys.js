window.angular.module('ngff.services.rawcompanys', [])
  .factory('Rawcompanys', ['$resource', 
    function($resource){
      return $resource(
        'rawcompanys/:rawcompanyId', 
        {
          rawcompanyId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);