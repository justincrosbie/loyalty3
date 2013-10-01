window.angular.module('ngff.controllers.rawpersons', [])
  .controller('RawpersonsController', ['$scope','$routeParams','$location','Global','Customers','Sites','Titles','Countrys','Rawcompanys','Rawpersons',
    function($scope, $routeParams, $location, Global, Customers, Sites, Titles, Countrys, Rawcompanys, Rawpersons) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }
 
      $scope.contactHomeSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }
 
      $scope.contactWorkSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }
 
      $scope.otherSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }
 
      $scope.populateLOVs = function(query) {

        Titles.query(query, function (titles) {
          $scope.titles = titles;
        });
        Rawcompanys.query(query, function (rawcompanys) {
          $scope.rawcompanys = rawcompanys;
        });
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

        if ( !this.rawperson ) {
          this.rawperson = $scope.tmprawperson;
        }

        var rawperson = new Rawpersons({ 
          code: this.rawperson.code,
          title: this.rawperson.title,
          firstname: this.rawperson.firstname,
          middlename: this.rawperson.middlename,
          lastname: this.rawperson.lastname,
          gender: this.rawperson.gender,
          dob: this.rawperson.dob,
          email: this.rawperson.email,
          rawcompany: this.rawperson.rawcompany,

          homephone: this.rawperson.homephone,
          homeaddress1: this.rawperson.homeaddress1,
          homeaddress2: this.rawperson.homeaddress2,
          homeaddress3: this.rawperson.homeaddress3,
          homesuburb: this.rawperson.homesuburb,
          homecity: this.rawperson.homecity,
          homepostcode: this.rawperson.homepostcode,
          homecountry: this.rawperson.homecountry,

          workphone: this.rawperson.workphone,
          workaddress1: this.rawperson.workaddress1,
          workaddress2: this.rawperson.workaddress2,
          workaddress3: this.rawperson.workaddress3,
          worksuburb: this.rawperson.worksuburb,
          workcity: this.rawperson.workcity,
          workpostcode: this.rawperson.workpostcode,
          workcountry: this.rawperson.workcountry,

          site: this.rawperson.site,
          customer: this.rawperson.customer
        });
 
        rawperson.$save(function (response) {
          $location.path("rawpersons/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var rawperson = $scope.rawperson;
 
        rawperson.$update(function () {
          $location.path('rawpersons/' + rawperson._id);
        });
      };
 
      $scope.find = function (query) {
        Rawpersons.query(query, function (rawpersons) {
          $scope.rawpersons = rawpersons;
        });
      };
 
      $scope.findOne = function () {
        Rawpersons.get({ rawpersonId: $routeParams.rawpersonId }, function (rawperson) {
          $scope.rawperson = rawperson;
        });
      };
 
      $scope.remove = function (rawperson) {
        rawperson.$remove();
        for (var i in $scope.rawpersons) {
          if ($scope.rawpersons[i] == rawperson) {
            $scope.rawpersons.splice(i, 1)
          }
        }
      };
    }]);