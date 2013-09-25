window.angular.module('ngff.services.sites', [])
  .factory('Sites', ['$resource', 
    function($resource){
      return $resource(
        'sites/:siteId', 
        {
          siteId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);