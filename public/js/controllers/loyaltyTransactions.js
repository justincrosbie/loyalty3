window.angular.module('ngff.controllers.loyaltyTransactions', [])
  .controller('LoyaltyTransactionsController', ['$scope','$routeParams','$location','Global','LoyaltySchemes','LoyaltyStatements','LoyaltyMembers','LoyaltyPoints','LoyaltyTransactions','Bookings','Revenues',
    function($scope, $routeParams, $location, Global, LoyaltySchemes, LoyaltyStatements, LoyaltyMembers, LoyaltyPoints, LoyaltyTransactions, Bookings, Revenues) {
 
      $scope.global = Global;

      $scope.populateLOVs = function(query) {

        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
        LoyaltyStatements.query(query, function (loyaltyStatements) {
          $scope.loyaltyStatements = loyaltyStatements;
        });
        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers;
        });
        LoyaltyPoints.query(query, function (loyaltyPoints) {
          $scope.loyaltyPoints = loyaltyPoints;
        });
        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings;
        });
        Revenues.query(query, function (revenues) {
          $scope.revenues = revenues;
        });
      };

      $scope.create = function () {
        var loyaltyTransaction = new LoyaltyTransactions({ 
          comments: this.loyaltyTransaction.comments,
          points: this.loyaltyTransaction.points,
          loyaltyScheme: this.loyaltyTransaction.loyaltyScheme._id,
          loyaltyStatement: this.loyaltyTransaction.loyaltyStatement,
          loyaltyPoint: this.loyaltyTransaction.loyaltyPoint,
          loyaltyMember: this.loyaltyTransaction.loyaltyMember,
          booking: this.loyaltyTransaction.booking,
          revenue: this.loyaltyTransaction.revenue
        });
 
        loyaltyTransaction.$save(function (response) {
          $location.path("loyaltyTransactions/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyTransaction = $scope.loyaltyTransaction;
 
        loyaltyTransaction.$update(function () {
          $location.path('loyaltyTransactions/' + loyaltyTransaction._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyTransactions.query(query, function (loyaltyTransactions) {
          $scope.loyaltyTransactions = loyaltyTransactions;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyTransactions.get({ loyaltyTransactionId: $routeParams.loyaltyTransactionId }, function (loyaltyTransaction) {
          $scope.loyaltyTransaction = loyaltyTransaction;
        });
      };
 
      $scope.remove = function (loyaltyTransaction) {
        loyaltyTransaction.$remove();
        for (var i in $scope.loyaltyTransactions) {
          if ($scope.loyaltyTransactions[i] == loyaltyTransaction) {
            $scope.loyaltyTransactions.splice(i, 1)
          }
        }
      };
    }]);