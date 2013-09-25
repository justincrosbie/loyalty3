window.angular.module('ngff.controllers.subscriptions', [])
  .controller('SubscriptionsController', ['$scope','$routeParams','$location','Global','Subscriptions',
    function($scope, $routeParams, $location, Global, Subscriptions) {
 
      $scope.global = Global;
 
      $scope.create = function () {
        var subscription = new Subscriptions({ 
          name: this.subscription.name,
          rate: this.subscription.rate
        });
 
        subscription.$save(function (response) {
          $location.path("subscriptions/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var subscription = $scope.subscription;
 
        subscription.$update(function () {
          $location.path('subscriptions/' + subscription._id);
        });
      };
 
      $scope.find = function (query) {
        Subscriptions.query(query, function (subscriptions) {
          $scope.subscriptions = subscriptions;
        });
      };
 
      $scope.findOne = function () {
        Subscriptions.get({ subscriptionId: $routeParams.subscriptionId }, function (subscription) {
          $scope.subscription = subscription;
        });
      };
 
      $scope.remove = function (subscription) {
        subscription.$remove();
        for (var i in $scope.subscriptions) {
          if ($scope.subscriptions[i] == subscription) {
            $scope.subscriptions.splice(i, 1)
          }
        }
      };
    }]);