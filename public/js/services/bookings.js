<<<<<<< HEAD
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
=======
window.angular.module('ngff.services.bookings', [])
  .factory('Bookings', ['$resource', 
    function($resource){
      return $resource(
        'bookings/:bookingId', 
        {
          bookingId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);