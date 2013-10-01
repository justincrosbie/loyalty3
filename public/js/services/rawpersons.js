window.angular.module('ngff.services.rawpersons', [])
  .factory('Rawpersons', ['$resource', 
    function($resource){
      return $resource(
        'rawpersons/:rawpersonId', 
        {
          rawpersonId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);