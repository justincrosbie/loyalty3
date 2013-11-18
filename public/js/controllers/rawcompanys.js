window.angular.module('ngff.controllers.rawcompanys', [])
  .controller('RawcompanysController', ['$scope','$routeParams','$location','Global','Countrys','Customers','Sites','Rawcompanys',
    function($scope, $routeParams, $location, Global, Countrys,Customers,Sites, Rawcompanys) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }

      $scope.contactSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }

      $scope.otherSelected = function(tmprawcompany) {
        $scope.tmprawcompany = tmprawcompany;
      }

      $scope.create = function () {

        if ( !this.rawcompany ) {
          this.rawcompany = $scope.tmprawcompany;
        }

        var rawcompany = new Rawcompanys({ 

          name: this.rawcompany.name ? this.rawcompany.name : null,
          email: this.rawcompany.email ? this.rawcompany.email : null,
          phone: this.rawcompany.phone ? this.rawcompany.phone : null,
          address1: this.rawcompany.address1 ? this.rawcompany.address1 : null,
          address2: this.rawcompany.address2 ? this.rawcompany.address2 : null,
          address3: this.rawcompany.address3 ? this.rawcompany.address3 : null,
          suburb: this.rawcompany.suburb ? this.rawcompany.suburb : null,
          city: this.rawcompany.city ? this.rawcompany.city : null,
          postcode: this.rawcompany.postcode ? this.rawcompany.postcode : null,
          country: this.rawcompany.country ? this.rawcompany.country._id : null,
          customer: this.rawcompany.customer ? this.rawcompany.customer._id : null,
          site: this.rawcompany.site ? this.rawcompany.site._id : null
        });
 
        rawcompany.$save(function (response) {
          $location.path("rawcompanys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var rawcompany = $scope.rawcompany;
 
        rawcompany.$update(function () {
          $location.path('rawcompanys/' + rawcompany._id);
        });
      };
 
      $scope.find = function (query) {
        Rawcompanys.query(query, function (rawcompanys) {
          $scope.rawcompanys = rawcompanys.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name'];
      var sortFields = ['name'];

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

  		
        if ( $scope.countrySearch ) {
          	q2val.country = $scope.countrySearch._id;
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

        Rawcompanys.query(query, function (rawcompanys) {
          $scope.rawcompanys = rawcompanys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = rawcompanys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Rawcompanys.get({ rawcompanyId: $routeParams.rawcompanyId }, function (rawcompany) {
          $scope.rawcompany = rawcompany;
          
        });
      };
 
      $scope.remove = function (rawcompany) {
        Rawcompanys.get({ rawcompanyId: rawcompany._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.rawcompanys) {
          if ($scope.rawcompanys[i] == rawcompany) {
            $scope.rawcompanys.splice(i, 1)
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

    }]);