window.angular.module('ngff.services.countrys', [])
  .factory('Countrys', ['$resource', 
    function($resource){
      return $resource(
        'countrys/:countryId', 
        {
          countryId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);