window.angular.module('ngff.controllers.loyaltyMembers', [])
  .controller('LoyaltyMembersController', ['$scope','$routeParams','$location','Global','Persons','LoyaltySchemes','LoyaltyMembers',
    function($scope, $routeParams, $location, Global, Persons, LoyaltySchemes, LoyaltyMembers) {
 
      $scope.global = Global;
 
      $scope.create = function () {

        var loyaltyMember = new LoyaltyMembers({ 
          loyaltyScheme: this.loyaltyMember.loyaltyScheme._id,
          person: this.loyaltyMember.person._id,
          start: this.loyaltyMember.start,
          end: this.loyaltyMember.end,
          card: this.loyaltyMember.card,
          password: this.loyaltyMember.password
        });

        loyaltyMember.$save(function (response) {
          $location.path("loyaltyMembers/" + response._id);
        });
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
