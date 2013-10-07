window.angular.module('ngff.controllers.loyaltyPoints', [])
  .controller('LoyaltyPointsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyPoints',
    function($scope, $routeParams, $location, Global, LoyaltySchemes, LoyaltyPoints) {
 
      $scope.global = Global;
      $scope.active = false;
 

      $scope.populateLOVs = function(query) {

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });

      };

      $scope.create = function () {
        var loyaltyPoint = new LoyaltyPoints({ 
          name: this.loyaltyPoint.name,
          code: this.loyaltyPoint.code,
          description: this.loyaltyPoint.description,
          active: this.loyaltyPoint.active,
          formula: this.loyaltyPoint.formula,
          start: this.loyaltyPoint.start,
          end: this.loyaltyPoint.end,
          loyaltyScheme: this.loyaltyPoint.loyaltyScheme
        });
 
        loyaltyPoint.$save(function (response) {
          $location.path("loyaltyPoints/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyPoint = $scope.loyaltyPoint;
 
        loyaltyPoint.$update(function () {
          $location.path('loyaltyPoints/' + loyaltyPoint._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyPoints.get({ loyaltyPointId: $routeParams.loyaltyPointId }, function (loyaltyPoint) {
          $scope.loyaltyPoint = loyaltyPoint;
        });
      };
 
      $scope.remove = function (loyaltyPoint) {
        loyaltyPoint.$remove();
        for (var i in $scope.loyaltyPoints) {
          if ($scope.loyaltyPoints[i] == loyaltyPoint) {
            $scope.loyaltyPoints.splice(i, 1)
          }
        }
      };
    }]);