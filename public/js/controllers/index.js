window.angular.module('ngff.controllers.index', [])
  .controller('IndexController', ['$scope', 'Global',
    function($scope, Global) {
      $scope.global = Global;

      $scope.intromessage = 'Guest Management is cool!';

      if ( Global.currentApp() == 'loyalty' ) {
	      $scope.intromessage = 'Loyalty 3.0 goes beyond traditional Loyalty systems to provide a more compelling and immersive experience for your customers, by leveraging state-of-the-art gamification techniques';
      }

    }]);