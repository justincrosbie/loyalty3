window.angular.module('ngff.services.sites', [])
  .factory('Sites', ['$resource', 
    function($resource){
      return $resource(
        'sites/:siteId', 
        {
          siteId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);