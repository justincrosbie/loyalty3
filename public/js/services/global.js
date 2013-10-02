window.angular.module('ngff.services.global', [])
  .factory('Global', function(){
    var current_user = window.user;
    var current_app = 'guestmanagement';

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      },
      currentApp: function(app) {
        if ( app ) {
          current_app = app;
        }
        return current_app;
      },
      currentAppName: function() {
        if ( current_app == 'loyalty' ) {
          return 'Loyalty 3.0';
        }
        if ( current_app == 'guestmanagement' ) {
          return 'Guest Management';
        }
        if ( current_app == 'bookingmanagement' ) {
          return 'Booking Management';
        }

        return 'No Name';
      }
    };
  });