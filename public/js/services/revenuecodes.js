window.angular.module('ngff.services.revenuecodes', [])
  .factory('Revenuecodes', ['$resource', 
    function($resource){
      return $resource(
        'revenuecodes/:revenuecodeId', 
        {
          revenuecodeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);