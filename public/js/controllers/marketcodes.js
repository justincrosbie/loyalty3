window.angular.module('ngff.controllers.marketcodes', [])
  .controller('MarketcodesController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Marketcodes',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Marketcodes) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.marketcode ) {
          this.marketcode = $scope.tmpmarketcode;
        }

        var marketcode = new Marketcodes({ 

          name: this.marketcode.name ? this.marketcode.name : null,
          code: this.marketcode.code ? this.marketcode.code : null,
          description: this.marketcode.description ? this.marketcode.description : null,
          site: this.marketcode.site ? this.marketcode.site._id : null,
          datasource: this.marketcode.datasource ? this.marketcode.datasource._id : null,
          customer: this.marketcode.customer ? this.marketcode.customer._id : null
        });
 
        marketcode.$save(function (response) {
          $location.path("marketcodes/" + response._id);
        });
      };
 
      $scope.update = function () {
        var marketcode = $scope.marketcode;
 
        marketcode.$update(function () {
          $location.path('marketcodes/' + marketcode._id);
        });
      };
 
      $scope.find = function (query) {
        Marketcodes.query(query, function (marketcodes) {
          $scope.marketcodes = marketcodes.data;
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

        Marketcodes.query(query, function (marketcodes) {
          $scope.marketcodes = marketcodes.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = marketcodes.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Marketcodes.get({ marketcodeId: $routeParams.marketcodeId }, function (marketcode) {
          $scope.marketcode = marketcode;
          
        });
      };
 
      $scope.remove = function (marketcode) {
        Marketcodes.get({ marketcodeId: marketcode._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.marketcodes) {
          if ($scope.marketcodes[i] == marketcode) {
            $scope.marketcodes.splice(i, 1)
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