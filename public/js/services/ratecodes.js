window.angular.module('ngff.services.ratecodes', [])
  .factory('Ratecodes', ['$resource', 
    function($resource){
      return $resource(
        'ratecodes/:ratecodeId', 
        {
          ratecodeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);