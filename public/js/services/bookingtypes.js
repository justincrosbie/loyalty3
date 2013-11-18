window.angular.module('ngff.services.bookingtypes', [])
  .factory('Bookingtypes', ['$resource', 
    function($resource){
      return $resource(
        'bookingtypes/:bookingtypeId', 
        {
          bookingtypeId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);