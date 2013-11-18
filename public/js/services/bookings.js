window.angular.module('ngff.services.bookings', [])
  .factory('Bookings', ['$resource', 
    function($resource){
      return $resource(
        'bookings/:bookingId', 
        {
          bookingId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);