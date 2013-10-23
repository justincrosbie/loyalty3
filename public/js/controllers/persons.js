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
          title: this.person.title._id,
          firstname: this.person.firstname,
          middlename: this.person.middlename,
          lastname: this.person.lastname,
          gender: this.person.gender,
          dob: this.person.dob,
          email: this.person.email,
          company: this.person.company._id,

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
          $scope.persons = persons.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortField = 'firstname';
      $scope.sortOrder = 1;
      
      $scope.findPaged = function () {
        var term = $scope.query || '';
        var fn = term.split(' ')[0] + '.*';
        var ln = term.split(' ')[1] + '.*';

        var query = {
            q2: term.split(' ').length > 1 ? 
              { 
                firstname : { regex: fn, options: 'i' },
                lastname : { regex: ln, options: 'i' }
              } :
              { 
                firstname : { regex: fn, options: 'i' }
              }
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Persons.query(query, function (persons) {
          $scope.persons = persons.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = persons.count;
          }
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

      $scope.pageChanged = function(page) {
        $scope.currentPage = page;
        $scope.findPaged();
      };

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.sortClass = {'firstname': 'sortable sort-asc'};

      $scope.changeSort = function (sortField) {
        if ( $scope.sortField == sortField ) {
          $scope.sortOrder *= -1;
        } else {
          $scope.sortOrder = 1;
        }

        $scope.sortClass = {};
        $scope.sortClass[sortField] = 'sortable' + ($scope.sortOrder == -1 ? ' sort-desc' : ' sort-asc');

        $scope.sortField = sortField;
        $scope.findPaged();
      }

    }]);