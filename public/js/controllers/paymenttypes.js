window.angular.module('ngff.controllers.paymenttypes', [])
  .controller('PaymenttypesController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Paymenttypes',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Paymenttypes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.paymenttype ) {
          this.paymenttype = $scope.tmppaymenttype;
        }

        var paymenttype = new Paymenttypes({ 

          name: this.paymenttype.name ? this.paymenttype.name : null,
          code: this.paymenttype.code ? this.paymenttype.code : null,
          description: this.paymenttype.description ? this.paymenttype.description : null,
          site: this.paymenttype.site ? this.paymenttype.site._id : null,
          datasource: this.paymenttype.datasource ? this.paymenttype.datasource._id : null,
          customer: this.paymenttype.customer ? this.paymenttype.customer._id : null
        });
 
        paymenttype.$save(function (response) {
          $location.path("paymenttypes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var paymenttype = $scope.paymenttype;
 
        paymenttype.$update(function () {
          $location.path('paymenttypes/' + paymenttype._id);
        });
      };
 
      $scope.find = function (query) {
        Paymenttypes.query(query, function (paymenttypes) {
          $scope.paymenttypes = paymenttypes.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name','code'];
      var sortFields = ['name','code'];

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

        Paymenttypes.query(query, function (paymenttypes) {
          $scope.paymenttypes = paymenttypes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = paymenttypes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Paymenttypes.get({ paymenttypeId: $routeParams.paymenttypeId }, function (paymenttype) {
          $scope.paymenttype = paymenttype;
          
        });
      };
 
      $scope.remove = function (paymenttype) {
        Paymenttypes.get({ paymenttypeId: paymenttype._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.paymenttypes) {
          if ($scope.paymenttypes[i] == paymenttype) {
            $scope.paymenttypes.splice(i, 1)
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