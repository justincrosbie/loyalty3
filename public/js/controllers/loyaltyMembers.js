window.angular.module('ngff.controllers.loyaltyMembers', [])
  .controller('LoyaltyMembersController', ['$scope','$routeParams','$location','Global','Persons','LoyaltySchemes','LoyaltyMembers',
    function($scope, $routeParams, $location, Global, Persons, LoyaltySchemes, LoyaltyMembers) {
 
      $scope.global = Global;
 
      $scope.populateLOVs = function(query) {

        Persons.query(query, function (persons) {
          $scope.persons = persons;
        });
        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
      };

      $scope.create = function () {
        var loyaltyMember = new LoyaltyMembers({ 
          card: this.loyaltyMember.card,
          password: this.loyaltyMember.password,
          start: this.loyaltyMember.start,
          end: this.loyaltyMember.end,
          loyaltyScheme: this.loyaltyMember.loyaltyScheme,
          person: this.loyaltyMember.person
        });
 
        loyaltyMember.$save(function (response) {
          $location.path("loyaltyMembers/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyMember = $scope.loyaltyMember;
 
        loyaltyMember.$update(function () {
          $location.path('loyaltyMembers/' + loyaltyMember._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyMembers.get({ loyaltyMemberId: $routeParams.loyaltyMemberId }, function (loyaltyMember) {
          $scope.loyaltyMember = loyaltyMember;
        });
      };
 
      $scope.remove = function (loyaltyMember) {
        loyaltyMember.$remove();
        for (var i in $scope.loyaltyMembers) {
          if ($scope.loyaltyMembers[i] == loyaltyMember) {
            $scope.loyaltyMembers.splice(i, 1)
          }
        }
      };
    }]);