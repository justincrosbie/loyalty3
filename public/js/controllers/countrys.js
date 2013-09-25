window.angular.module('ngff.controllers.countrys', [])
  .controller('CountrysController', ['$scope','$routeParams','$location', '$timeout','Global','Currencys','Countrys',
    function($scope, $routeParams, $location, $timeout, Global, Currencys, Countrys) {
 
      $scope.global = Global;
 
      $scope.populateCurrencys = function(query) {
        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys;
        });
      };
 
      $scope.create = function () {
        var country = new Countrys({ 
          name: this.country.name,
          isocode: this.country.isocode,
          idc: this.country.idc,
          currency: this.country.currency
        });
 
        country.$save(function (response) {
          $location.path("countrys/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var country = $scope.country;
 
        country.$update(function () {
          $location.path('countrys/' + country._id);
        });
      };
 
      $scope.find = function (query) {
        Countrys.query(query, function (countrys) {
          $scope.countrys = countrys;
        });
      };
 
      $scope.findOne = function () {
        Countrys.get({ countryId: $routeParams.countryId }, function (country) {
          $scope.country = country;
        });
      };
 
      $scope.remove = function (country) {
        country.$remove();
        for (var i in $scope.countrys) {
          if ($scope.countrys[i] == country) {
            $scope.countrys.splice(i, 1)
          }
        }
      };
    }]);