window.angular.module('ngff.controllers.companys', [])
  .controller('CompanysController', ['$scope','$routeParams','$location', '$timeout','Global','Customers','Sites','Countrys','Companys',
    function($scope, $routeParams, $location, $timeout, Global, Customers, Sites, Countrys, Companys) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
      }
 
      $scope.contactSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
      }
 
      $scope.otherSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
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

        if ( !this.company ) {
          this.company = $scope.tmpcompany;
        }
        
        var company = new Companys({ 
          name: this.company.name,
          iata: this.company.iata,
          email: this.company.email,
          phone: this.company.phone,
          address1: this.company.address1,
          address2: this.company.address2,
          address3: this.company.address3,
          suburb: this.company.suburb,
          city: this.company.city,
          postcode: this.company.postcode,
          country: this.company.country,
          site: this.company.site,
          customer: this.company.customer
        });
 
        company.$save(function (response) {
          $location.path("companys/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var company = $scope.company;
 
        company.$update(function () {
          $location.path('companys/' + company._id);
        });
      };
 
      $scope.find = function (query) {
        Companys.query(query, function (companys) {
          $scope.companys = companys;
        });
      };
 
      $scope.findOne = function () {
        Companys.get({ companyId: $routeParams.companyId }, function (company) {
          $scope.company = company;
        });
      };
 
      $scope.remove = function (company) {
        company.$remove();
        for (var i in $scope.companys) {
          if ($scope.companys[i] == company) {
            $scope.companys.splice(i, 1)
          }
        }
      };
    }]);