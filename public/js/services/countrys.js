window.angular.module('ngff.services.countrys', [])
  .factory('Countrys', ['$resource', 
    function($resource){
      return $resource(
        'countrys/:countryId', 
        {
          countryId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);