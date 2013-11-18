window.angular.module('ngff.controllers.companys', [])
  .controller('CompanysController', ['$scope','$routeParams','$location','Global','Countrys','Customers','Sites','Companys',
    function($scope, $routeParams, $location, Global, Countrys,Customers,Sites, Companys) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
      }

      $scope.contactSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
      }

      $scope.otherSelected = function(tmpcompany) {
        $scope.tmpcompany = tmpcompany;
      }

      $scope.create = function () {

        if ( !this.company ) {
          this.company = $scope.tmpcompany;
        }

        var company = new Companys({ 

          name: this.company.name ? this.company.name : null,
          email: this.company.email ? this.company.email : null,
          phone: this.company.phone ? this.company.phone : null,
          address1: this.company.address1 ? this.company.address1 : null,
          address2: this.company.address2 ? this.company.address2 : null,
          address3: this.company.address3 ? this.company.address3 : null,
          suburb: this.company.suburb ? this.company.suburb : null,
          city: this.company.city ? this.company.city : null,
          postcode: this.company.postcode ? this.company.postcode : null,
          country: this.company.country ? this.company.country._id : null,
          customer: this.company.customer ? this.company.customer._id : null,
          site: this.company.site ? this.company.site._id : null
        });
 
        company.$save(function (response) {
          $location.path("companys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var company = $scope.company;
 
        company.$update(function () {
          $location.path('companys/' + company._id);
        });
      };
 
      $scope.find = function (query) {
        Companys.query(query, function (companys) {
          $scope.companys = companys.data;
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

        Companys.query(query, function (companys) {
          $scope.companys = companys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = companys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Companys.get({ companyId: $routeParams.companyId }, function (company) {
          $scope.company = company;
          
        });
      };
 
      $scope.remove = function (company) {
        Companys.get({ companyId: company._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.companys) {
          if ($scope.companys[i] == company) {
            $scope.companys.splice(i, 1)
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