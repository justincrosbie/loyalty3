<<<<<<< HEAD
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
=======
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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);