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
      }
    };
  });