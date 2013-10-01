window.angular.module('ngff.controllers.loyaltySchemes', [])
  .controller('LoyaltySchemesController', ['$scope','$routeParams','$location','Global','LoyaltySchemes',
    function($scope, $routeParams, $location, Global, LoyaltySchemes) {
 
      $scope.global = Global;
 
      $scope.create = function () {
        var loyaltyScheme = new LoyaltySchemes({ 
          name: this.loyaltyScheme.name,
          code: this.loyaltyScheme.code,
          description: this.loyaltyScheme.description,
          active: this.loyaltyScheme.active,
          rate: this.loyaltyScheme.rate
        });
 
        loyaltyScheme.$save(function (response) {
          $location.path("loyaltySchemes/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyScheme = $scope.loyaltyScheme;
 
        loyaltyScheme.$update(function () {
          $location.path('loyaltySchemes/' + loyaltyScheme._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
      };
 
      $scope.findOne = function () {
        LoyaltySchemes.get({ loyaltySchemeId: $routeParams.loyaltySchemeId }, function (loyaltyScheme) {
          $scope.loyaltyScheme = loyaltyScheme;
        });
      };
 
      $scope.remove = function (loyaltyScheme) {
        loyaltyScheme.$remove();
        for (var i in $scope.loyaltySchemes) {
          if ($scope.loyaltySchemes[i] == loyaltyScheme) {
            $scope.loyaltySchemes.splice(i, 1)
          }
        }
      };
    }]);