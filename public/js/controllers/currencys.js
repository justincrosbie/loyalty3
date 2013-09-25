window.angular.module('ngff.controllers.currencys', [])
  .controller('CurrencysController', ['$scope','$routeParams','$location','Global','Currencys',
    function($scope, $routeParams, $location, Global, Currencys) {
 
      $scope.global = Global;
 
      $scope.create = function () {
        var currency = new Currencys({ 
          name: this.currency.name,
          isocode: this.currency.isocode,
          symbol: this.currency.symbol
        });
 
        currency.$save(function (response) {
          $location.path("currencys/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var currency = $scope.currency;
 
        currency.$update(function () {
          $location.path('currencys/' + currency._id);
        });
      };
 
      $scope.find = function (query) {
        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys;
        });
      };
 
      $scope.findOne = function () {
        Currencys.get({ currencyId: $routeParams.currencyId }, function (currency) {
          $scope.currency = currency;
        });
      };
 
      $scope.remove = function (currency) {
        currency.$remove();
        for (var i in $scope.currencys) {
          if ($scope.currencys[i] == currency) {
            $scope.currencys.splice(i, 1)
          }
        }
      };
    }]);