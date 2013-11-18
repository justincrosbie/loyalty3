window.angular.module('ngff.services.marketcodes', [])
  .factory('Marketcodes', ['$resource', 
    function($resource){
      return $resource(
        'marketcodes/:marketcodeId', 
        {
          marketcodeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);