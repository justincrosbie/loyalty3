window.angular.module('ngff.services.bookingstatuss', [])
  .factory('Bookingstatuss', ['$resource', 
    function($resource){
      return $resource(
        'bookingstatuss/:bookingstatusId', 
        {
          bookingstatusId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);