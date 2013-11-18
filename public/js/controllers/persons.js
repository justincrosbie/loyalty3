<<<<<<< HEAD
window.angular.module('ngff.controllers.persons', [])
  .controller('PersonsController', ['$scope','$routeParams','$location','Global','Titles','Countrys','Companys','Countrys','Customers','Sites','Persons',
    function($scope, $routeParams, $location, Global, Titles,Countrys,Companys,Countrys,Customers,Sites, Persons) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }

      $scope.homecontactSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }

      $scope.workcontactSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }

      $scope.otherSelected = function(tmpperson) {
        $scope.tmpperson = tmpperson;
      }

      $scope.create = function () {

        if ( !this.person ) {
          this.person = $scope.tmpperson;
        }

        var person = new Persons({ 

          title: this.person.title ? this.person.title._id : null,
          firstname: this.person.firstname ? this.person.firstname : null,
          middlename: this.person.middlename ? this.person.middlename : null,
          lastname: this.person.lastname ? this.person.lastname : null,
          gender: this.person.gender ? this.person.gender : null,
          contactable: this.person.contactable ? this.person.contactable : null,
          dob: this.person.dob ? this.person.dob : null,
          email: this.person.email ? this.person.email : null,
          homephone: this.person.homephone ? this.person.homephone : null,
          homeaddress1: this.person.homeaddress1 ? this.person.homeaddress1 : null,
          homeaddress2: this.person.homeaddress2 ? this.person.homeaddress2 : null,
          homeaddress3: this.person.homeaddress3 ? this.person.homeaddress3 : null,
          homesuburb: this.person.homesuburb ? this.person.homesuburb : null,
          homecity: this.person.homecity ? this.person.homecity : null,
          homepostcode: this.person.homepostcode ? this.person.homepostcode : null,
          homecountry: this.person.homecountry ? this.person.homecountry._id : null,
          company: this.person.company ? this.person.company._id : null,
          workphone: this.person.workphone ? this.person.workphone : null,
          workaddress1: this.person.workaddress1 ? this.person.workaddress1 : null,
          workaddress2: this.person.workaddress2 ? this.person.workaddress2 : null,
          workaddress3: this.person.workaddress3 ? this.person.workaddress3 : null,
          worksuburb: this.person.worksuburb ? this.person.worksuburb : null,
          workcity: this.person.workcity ? this.person.workcity : null,
          workpostcode: this.person.workpostcode ? this.person.workpostcode : null,
          workcountry: this.person.workcountry ? this.person.workcountry._id : null,
          customer: this.person.customer ? this.person.customer._id : null,
          site: this.person.site ? this.person.site._id : null
        });
 
        person.$save(function (response) {
          $location.path("persons/" + response._id);
        });
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
      $scope.sortOrder = 1;
      var searchFields = ['firstname','middlename','lastname'];
      var sortFields = ['title','firstname','middlename','lastname'];

      $scope.sortField = sortFields[0];
      
      $scope.findPaged = function () {
        var term = $scope.query || '';
        var termArray = term.split(' ');
        
        var q2val = {};
        for ( var i=0; i<termArray.length; i++ ) {
        	if ( i <= searchFields.length ) {
        		q2val[searchFields[i]] = { regex : termArray[i], options: 'i' };
        	}
        }

  		
        if ( $scope.titleSearch ) {
          	q2val.title = $scope.titleSearch._id;
        }
        if ( $scope.homecountrySearch ) {
          	q2val.homecountry = $scope.homecountrySearch._id;
        }
        if ( $scope.companySearch ) {
          	q2val.company = $scope.companySearch._id;
        }
        if ( $scope.workcountrySearch ) {
          	q2val.workcountry = $scope.workcountrySearch._id;
        }
        if ( $scope.customerSearch ) {
          	q2val.customer = $scope.customerSearch._id;
        }
        if ( $scope.siteSearch ) {
          	q2val.site = $scope.siteSearch._id;
        }

        var query = {
            q2: q2val
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
          
          if ( $scope.person && $scope.person.dob ) {
            $scope.person.dob = new Date($scope.person.dob);
          }
        });
      };
 
      $scope.remove = function (person) {
        Persons.get({ personId: person._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.persons) {
          if ($scope.persons[i] == person) {
            $scope.persons.splice(i, 1)
          }
        }
        $scope.totalItems--;
      };

      $scope.pageChanged = function(page) {
        $scope.currentPage = page;
        $scope.findPaged();
      };

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.sortClass = {};
      $scope.sortClass[searchFields[0]] = 'sortable sort-asc sort-desc';

      $scope.changeSort = function (sortField) {
        if ( $scope.sortField == sortField ) {
          $scope.sortOrder *= -1;
        } else {
          $scope.sortOrder = 1;
        }

        $scope.sortClass = {};
        $scope.sortClass[sortField] = $scope.sortOrder == -1 ? 'headerSortDown' : 'headerSortUp';

        $scope.sortField = sortField;
        $scope.findPaged();
      }

=======
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
        var q2val = term.split(' ').length > 1 ? 
              { 
                firstname : { regex: fn, options: 'i' },
                lastname : { regex: ln, options: 'i' }
              } :
              { 
                firstname : { regex: fn, options: 'i' }
              };

        if ( $scope.customerSearch ) {
          q2val.customer = $scope.customerSearch._id;
        }
        if ( $scope.siteSearch ) {
          q2val.site = $scope.siteSearch._id;
        }

        var query = {
            q2: q2val
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

      $scope.sortClass = {'firstname': 'sortable sort-asc sort-desc'};

      $scope.changeSort = function (sortField) {
        if ( $scope.sortField == sortField ) {
          $scope.sortOrder *= -1;
        } else {
          $scope.sortOrder = 1;
        }

        $scope.sortClass = {};
        $scope.sortClass[sortField] = $scope.sortOrder == -1 ? 'headerSortDown' : 'headerSortUp';

        $scope.sortField = sortField;
        $scope.findPaged();
      }

>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);