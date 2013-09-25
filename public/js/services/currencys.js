window.angular.module('ngff.services.currencys', [])
  .factory('Currencys', ['$resource', 
    function($resource){
      return $resource(
        'currencys/:currencyId', 
        {
          currencyId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);