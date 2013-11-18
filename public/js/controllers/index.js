<<<<<<< HEAD
window.angular.module('ngff.controllers.index', [])
  .controller('IndexController', ['$scope', 'Global',
    function($scope, Global) {
      $scope.global = Global;

	  $scope.myInterval = 5000;
=======
window.angular.module('ngff.controllers.index', [])
  .controller('IndexController', ['$scope', 'Global',
    function($scope, Global) {
      $scope.global = Global;

      $scope.intromessage = 'Guest Management is cool!';

      if ( Global.currentApp() == 'loyalty' ) {
	      $scope.intromessage = 'Loyalty 3.0 goes beyond traditional Loyalty systems to provide a more compelling and immersive experience for your customers, by leveraging state-of-the-art gamification techniques';
      }
      if ( Global.currentApp() == 'bookingmanagement' ) {
	      $scope.intromessage = 'In Booking Management, you can administer the raw records entering the application';
      }
      if ( Global.currentApp() == 'guestmanagement' ) {
	      $scope.intromessage = 'Guest Management is cool!';
      }

	  $scope.myInterval = 5000;
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);