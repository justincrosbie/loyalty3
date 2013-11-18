<<<<<<< HEAD
window.angular.module('ngff.controllers.rawpersons', [])
  .controller('RawpersonsController', ['$scope','$routeParams','$location','Global','Titles','Countrys','Companys','Countrys','Rawcompanys','Customers','Datasources','Sites','Rawpersons',
    function($scope, $routeParams, $location, Global, Titles,Countrys,Companys,Countrys,Rawcompanys,Customers,Datasources,Sites, Rawpersons) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }

      $scope.homecontactSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }

      $scope.workcontactSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }

      $scope.otherSelected = function(tmprawperson) {
        $scope.tmprawperson = tmprawperson;
      }

      $scope.create = function () {

        if ( !this.rawperson ) {
          this.rawperson = $scope.tmprawperson;
        }

        var rawperson = new Rawpersons({ 

          title: this.rawperson.title ? this.rawperson.title._id : null,
          firstname: this.rawperson.firstname ? this.rawperson.firstname : null,
          middlename: this.rawperson.middlename ? this.rawperson.middlename : null,
          lastname: this.rawperson.lastname ? this.rawperson.lastname : null,
          gender: this.rawperson.gender ? this.rawperson.gender : null,
          contactable: this.rawperson.contactable ? this.rawperson.contactable : null,
          dob: this.rawperson.dob ? this.rawperson.dob : null,
          email: this.rawperson.email ? this.rawperson.email : null,
          homephone: this.rawperson.homephone ? this.rawperson.homephone : null,
          homeaddress1: this.rawperson.homeaddress1 ? this.rawperson.homeaddress1 : null,
          homeaddress2: this.rawperson.homeaddress2 ? this.rawperson.homeaddress2 : null,
          homeaddress3: this.rawperson.homeaddress3 ? this.rawperson.homeaddress3 : null,
          homesuburb: this.rawperson.homesuburb ? this.rawperson.homesuburb : null,
          homecity: this.rawperson.homecity ? this.rawperson.homecity : null,
          homepostcode: this.rawperson.homepostcode ? this.rawperson.homepostcode : null,
          homecountry: this.rawperson.homecountry ? this.rawperson.homecountry._id : null,
          company: this.rawperson.company ? this.rawperson.company._id : null,
          workphone: this.rawperson.workphone ? this.rawperson.workphone : null,
          workaddress1: this.rawperson.workaddress1 ? this.rawperson.workaddress1 : null,
          workaddress2: this.rawperson.workaddress2 ? this.rawperson.workaddress2 : null,
          workaddress3: this.rawperson.workaddress3 ? this.rawperson.workaddress3 : null,
          worksuburb: this.rawperson.worksuburb ? this.rawperson.worksuburb : null,
          workcity: this.rawperson.workcity ? this.rawperson.workcity : null,
          workpostcode: this.rawperson.workpostcode ? this.rawperson.workpostcode : null,
          workcountry: this.rawperson.workcountry ? this.rawperson.workcountry._id : null,
          rawcompany: this.rawperson.rawcompany ? this.rawperson.rawcompany._id : null,
          customer: this.rawperson.customer ? this.rawperson.customer._id : null,
          datasource: this.rawperson.datasource ? this.rawperson.datasource._id : null,
          site: this.rawperson.site ? this.rawperson.site._id : null
        });
 
        rawperson.$save(function (response) {
          $location.path("rawpersons/" + response._id);
        });
      };
 
      $scope.update = function () {
        var rawperson = $scope.rawperson;
 
        rawperson.$update(function () {
          $location.path('rawpersons/' + rawperson._id);
        });
      };
 
      $scope.find = function (query) {
        Rawpersons.query(query, function (rawpersons) {
          $scope.rawpersons = rawpersons.data;
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
        if ( $scope.rawcompanySearch ) {
          	q2val.rawcompany = $scope.rawcompanySearch._id;
        }
        if ( $scope.customerSearch ) {
          	q2val.customer = $scope.customerSearch._id;
        }
        if ( $scope.datasourceSearch ) {
          	q2val.datasource = $scope.datasourceSearch._id;
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

        Rawpersons.query(query, function (rawpersons) {
          $scope.rawpersons = rawpersons.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = rawpersons.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Rawpersons.get({ rawpersonId: $routeParams.rawpersonId }, function (rawperson) {
          $scope.rawperson = rawperson;
          
          if ( $scope.rawperson && $scope.rawperson.dob ) {
            $scope.rawperson.dob = new Date($scope.rawperson.dob);
          }
        });
      };
 
      $scope.remove = function (rawperson) {
        Rawpersons.get({ rawpersonId: rawperson._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.rawpersons) {
          if ($scope.rawpersons[i] == rawperson) {
            $scope.rawpersons.splice(i, 1)
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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);