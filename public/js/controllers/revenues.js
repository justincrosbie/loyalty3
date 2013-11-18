window.angular.module('ngff.controllers.revenues', [])
  .controller('RevenuesController', ['$scope','$routeParams','$location','Global','Currencys','Bookings','Paymenttypes','Revenuecodes','Sites','Datasources','Customers','Revenues',
    function($scope, $routeParams, $location, Global, Currencys,Bookings,Paymenttypes,Revenuecodes,Sites,Datasources,Customers, Revenues) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmprevenue) {
        $scope.tmprevenue = tmprevenue;
      }

      $scope.codesSelected = function(tmprevenue) {
        $scope.tmprevenue = tmprevenue;
      }

      $scope.create = function () {

        if ( !this.revenue ) {
          this.revenue = $scope.tmprevenue;
        }

        var revenue = new Revenues({ 

          code: this.revenue.code ? this.revenue.code : null,
          datespent: this.revenue.datespent ? this.revenue.datespent : null,
          comments: this.revenue.comments ? this.revenue.comments : null,
          amount: this.revenue.amount ? this.revenue.amount : null,
          quantity: this.revenue.quantity ? this.revenue.quantity : null,
          currency: this.revenue.currency ? this.revenue.currency._id : null,
          booking: this.revenue.booking ? this.revenue.booking._id : null,
          paymenttype: this.revenue.paymenttype ? this.revenue.paymenttype._id : null,
          revenuecode: this.revenue.revenuecode ? this.revenue.revenuecode._id : null,
          site: this.revenue.site ? this.revenue.site._id : null,
          datasource: this.revenue.datasource ? this.revenue.datasource._id : null,
          customer: this.revenue.customer ? this.revenue.customer._id : null
        });
 
        revenue.$save(function (response) {
          $location.path("revenues/" + response._id);
        });
      };
 
      $scope.update = function () {
        var revenue = $scope.revenue;
 
        revenue.$update(function () {
          $location.path('revenues/' + revenue._id);
        });
      };
 
      $scope.find = function (query) {
        Revenues.query(query, function (revenues) {
          $scope.revenues = revenues.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = [];
      var sortFields = ['datespent'];

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

  		
        if ( $scope.currencySearch ) {
          	q2val.currency = $scope.currencySearch._id;
        }
        if ( $scope.bookingSearch ) {
          	q2val.booking = $scope.bookingSearch._id;
        }
        if ( $scope.paymenttypeSearch ) {
          	q2val.paymenttype = $scope.paymenttypeSearch._id;
        }
        if ( $scope.revenuecodeSearch ) {
          	q2val.revenuecode = $scope.revenuecodeSearch._id;
        }
        if ( $scope.siteSearch ) {
          	q2val.site = $scope.siteSearch._id;
        }
        if ( $scope.datasourceSearch ) {
          	q2val.datasource = $scope.datasourceSearch._id;
        }
        if ( $scope.customerSearch ) {
          	q2val.customer = $scope.customerSearch._id;
        }

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Revenues.query(query, function (revenues) {
          $scope.revenues = revenues.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = revenues.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Revenues.get({ revenueId: $routeParams.revenueId }, function (revenue) {
          $scope.revenue = revenue;
          
          if ( $scope.revenue && $scope.revenue.datespent ) {
            $scope.revenue.datespent = new Date($scope.revenue.datespent);
          }
        });
      };
 
      $scope.remove = function (revenue) {
        Revenues.get({ revenueId: revenue._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.revenues) {
          if ($scope.revenues[i] == revenue) {
            $scope.revenues.splice(i, 1)
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