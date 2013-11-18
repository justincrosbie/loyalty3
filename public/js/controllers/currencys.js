window.angular.module('ngff.controllers.currencys', [])
  .controller('CurrencysController', ['$scope','$routeParams','$location','Global','Currencys',
    function($scope, $routeParams, $location, Global,  Currencys) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.currency ) {
          this.currency = $scope.tmpcurrency;
        }

        var currency = new Currencys({ 

          name: this.currency.name ? this.currency.name : null,
          iso: this.currency.iso ? this.currency.iso : null,
          symbol: this.currency.symbol ? this.currency.symbol : null,
          exchangerate: this.currency.exchangerate ? this.currency.exchangerate : null
        });
 
        currency.$save(function (response) {
          $location.path("currencys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var currency = $scope.currency;
 
        currency.$update(function () {
          $location.path('currencys/' + currency._id);
        });
      };
 
      $scope.find = function (query) {
        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name','iso'];
      var sortFields = ['name','iso'];

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

  		

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = currencys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Currencys.get({ currencyId: $routeParams.currencyId }, function (currency) {
          $scope.currency = currency;
          
        });
      };
 
      $scope.remove = function (currency) {
        Currencys.get({ currencyId: currency._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.currencys) {
          if ($scope.currencys[i] == currency) {
            $scope.currencys.splice(i, 1)
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