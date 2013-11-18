window.angular.module('ngff.services.currencys', [])
  .factory('Currencys', ['$resource', 
    function($resource){
      return $resource(
        'currencys/:currencyId', 
        {
          currencyId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);