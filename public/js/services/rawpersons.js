window.angular.module('ngff.services.rawpersons', [])
  .factory('Rawpersons', ['$resource', 
    function($resource){
      return $resource(
        'rawpersons/:rawpersonId', 
        {
          rawpersonId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);