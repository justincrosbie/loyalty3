window.angular.module('ngff.controllers.rawcompanys', [])
  .controller('RawcompanysController', ['$scope','$routeParams','$location', '$timeout','Global','Customers','Sites','Countrys','Rawcompanys',
    function($scope, $routeParams, $location, $timeout, Global, Customers, Sites, Countrys, Rawcompanys) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }
 
      $scope.contactSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }
 
      $scope.otherSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }
 
      $scope.populateLOVs = function(query) {

        Countrys.query(query, function (countrys) {
          $scope.countrys = countrys;
        });
        Sites.query(query, function (sites) {
          $scope.sites = sites;
        });
        Customers.query(query, function (customers) {
          $scope.customers = customers;
        });
      };

      $scope.create = function () {

        if ( !this.rawcompany ) {
          this.rawcompany = $scope.tmprawcompany;
        }
        
        var rawcompany = new Rawcompanys({ 
          code: this.rawcompany.code,
          name: this.rawcompany.name,
          iata: this.rawcompany.iata,
          email: this.rawcompany.email,
          phone: this.rawcompany.phone,
          address1: this.rawcompany.address1,
          address2: this.rawcompany.address2,
          address3: this.rawcompany.address3,
          suburb: this.rawcompany.suburb,
          city: this.rawcompany.city,
          postcode: this.rawcompany.postcode,
          country: this.rawcompany.country,
          site: this.rawcompany.site,
          customer: this.rawcompany.customer
        });
 
        rawcompany.$save(function (response) {
          $location.path("rawcompanys/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var rawcompany = $scope.rawcompany;
 
        rawcompany.$update(function () {
          $location.path('rawcompanys/' + rawcompany._id);
        });
      };
 
      $scope.find = function (query) {
        Rawcompanys.query(query, function (rawcompanys) {
          $scope.rawcompanys = rawcompanys;
        });
      };
 
      $scope.findOne = function () {
        Rawcompanys.get({ rawcompanyId: $routeParams.rawcompanyId }, function (rawcompany) {
          $scope.rawcompany = rawcompany;
        });
      };
 
      $scope.remove = function (rawcompany) {
        rawcompany.$remove();
        for (var i in $scope.rawcompanys) {
          if ($scope.rawcompanys[i] == rawcompany) {
            $scope.rawcompanys.splice(i, 1)
          }
        }
      };
    }]);