window.angular.module('ngff.controllers.titles', [])
  .controller('TitlesController', ['$scope','$routeParams','$location','Global','Titles',
    function($scope, $routeParams, $location, Global, Titles) {
 
      $scope.global = Global;
 
      $scope.create = function () {
        var title = new Titles({ 
          name: this.title.name,
          rate: this.title.rate
        });
 
        title.$save(function (response) {
          $location.path("titles/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var title = $scope.title;
 
        title.$update(function () {
          $location.path('titles/' + title._id);
        });
      };
 
      $scope.find = function (query) {
        Titles.query(query, function (titles) {
          $scope.titles = titles;
        });
      };
 
      $scope.findOne = function () {
        Titles.get({ titleId: $routeParams.titleId }, function (title) {
          $scope.title = title;
        });
      };
 
      $scope.remove = function (title) {
        title.$remove();
        for (var i in $scope.titles) {
          if ($scope.titles[i] == title) {
            $scope.titles.splice(i, 1)
          }
        }
      };
    }]);