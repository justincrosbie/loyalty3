window.angular.module('ngff.controllers.persons', [])
  .controller('PersonsController', ['$scope','$routeParams','$location','Global','Customers','Sites','Titles','Countrys','Companys','Persons',
    function($scope, $routeParams, $location, Global, Customers, Sites, Titles, Countrys, Companys, Persons) {
 
      $scope.global = Global;

      $scope.detailsSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }
 
      $scope.contactHomeSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }
 
      $scope.contactWorkSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }
 
      $scope.otherSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }
 
      $scope.populateLOVs = function(query) {

        Titles.query(query, function (titles) {
          $scope.titles = titles;
        });
        Companys.query(query, function (companys) {
          $scope.companys = companys;
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

        if ( !this.person ) {
          this.person = $scope.tmpperson;
        }

        var person = new Persons({ 
          title: this.person.title,
          firstname: this.person.firstname,
          middlename: this.person.middlename,
          lastname: this.person.lastname,
          gender: this.person.gender,
          dob: this.person.dob,
          email: this.person.email,
          company: this.person.company,

          homephone: this.person.homephone,
          homeaddress1: this.person.homeaddress1,
          homeaddress2: this.person.homeaddress2,
          homeaddress3: this.person.homeaddress3,
          homesuburb: this.person.homesuburb,
          homecity: this.person.homecity,
          homepostcode: this.person.homepostcode,
          homecountry: this.person.homecountry,

          workphone: this.person.workphone,
          workaddress1: this.person.workaddress1,
          workaddress2: this.person.workaddress2,
          workaddress3: this.person.workaddress3,
          worksuburb: this.person.worksuburb,
          workcity: this.person.workcity,
          workpostcode: this.person.workpostcode,
          workcountry: this.person.workcountry,

          site: this.person.site,
          customer: this.person.customer
        });
 
        person.$save(function (response) {
          $location.path("persons/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var person = $scope.person;
 
        person.$update(function () {
          $location.path('persons/' + person._id);
        });
      };
 
      $scope.find = function (query) {
        Persons.query(query, function (persons) {
          $scope.persons = persons;
        });
      };
 
      $scope.findOne = function () {
        Persons.get({ personId: $routeParams.personId }, function (person) {
          $scope.person = person;
        });
      };
 
      $scope.remove = function (person) {
        person.$remove();
        for (var i in $scope.persons) {
          if ($scope.persons[i] == person) {
            $scope.persons.splice(i, 1)
          }
        }
      };
    }]);