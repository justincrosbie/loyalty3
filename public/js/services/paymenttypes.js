window.angular.module('ngff.services.paymenttypes', [])
  .factory('Paymenttypes', ['$resource', 
    function($resource){
      return $resource(
        'paymenttypes/:paymenttypeId', 
        {
          paymenttypeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);