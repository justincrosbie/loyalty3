window.angular.module('ngff.controllers.loyaltyStatements', [])
  .controller('LoyaltyStatementsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyStatements',
    function($scope, $routeParams, $location, Global, LoyaltySchemes, LoyaltyStatements) {
 
      $scope.global = Global;
 
      $scope.populateLOVs = function(query) {

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
      };

      $scope.create = function () {
        var loyaltyStatement = new LoyaltyStatements({ 
          name: this.loyaltyStatement.name,
          code: this.loyaltyStatement.code,
          description: this.loyaltyStatement.description,
          active: this.loyaltyStatement.active,
          start: this.loyaltyStatement.start,
          end: this.loyaltyStatement.end,
          loyaltyScheme: this.loyaltyStatement.loyaltyScheme
        });
 
        loyaltyStatement.$save(function (response) {
          $location.path("loyaltyStatements/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyStatement = $scope.loyaltyStatement;
 
        loyaltyStatement.$update(function () {
          $location.path('loyaltyStatements/' + loyaltyStatement._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyStatements.query(query, function (loyaltyStatements) {
          $scope.loyaltyStatements = loyaltyStatements;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyStatements.get({ loyaltyStatementId: $routeParams.loyaltyStatementId }, function (loyaltyStatement) {
          $scope.loyaltyStatement = loyaltyStatement;
        });
      };
 
      $scope.remove = function (loyaltyStatement) {
        loyaltyStatement.$remove();
        for (var i in $scope.loyaltyStatements) {
          if ($scope.loyaltyStatements[i] == loyaltyStatement) {
            $scope.loyaltyStatements.splice(i, 1)
          }
        }
      };
    }]);