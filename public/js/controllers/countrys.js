<<<<<<< HEAD
window.angular.module('ngff.controllers.countrys', [])
  .controller('CountrysController', ['$scope','$routeParams','$location','Global','Countrys',
    function($scope, $routeParams, $location, Global,  Countrys) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.country ) {
          this.country = $scope.tmpcountry;
        }

        var country = new Countrys({ 

          name: this.country.name ? this.country.name : null,
          iso: this.country.iso ? this.country.iso : null,
          idc: this.country.idc ? this.country.idc : null
        });
 
        country.$save(function (response) {
          $location.path("countrys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var country = $scope.country;
 
        country.$update(function () {
          $location.path('countrys/' + country._id);
        });
      };
 
      $scope.find = function (query) {
        Countrys.query(query, function (countrys) {
          $scope.countrys = countrys.data;
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

        Countrys.query(query, function (countrys) {
          $scope.countrys = countrys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = countrys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Countrys.get({ countryId: $routeParams.countryId }, function (country) {
          $scope.country = country;
          
        });
      };
 
      $scope.remove = function (country) {
        Countrys.get({ countryId: country._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.countrys) {
          if ($scope.countrys[i] == country) {
            $scope.countrys.splice(i, 1)
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
window.angular.module('ngff.controllers.countrys', [])
  .controller('CountrysController', ['$scope','$routeParams','$location', '$timeout','Global','Currencys','Countrys',
    function($scope, $routeParams, $location, $timeout, Global, Currencys, Countrys) {
 
      $scope.global = Global;
 
      $scope.populateCurrencys = function(query) {
        Currencys.query(query, function (currencys) {
          $scope.currencys = currencys;
        });
      };
 
      $scope.create = function () {
        var country = new Countrys({ 
          name: this.country.name,
          isocode: this.country.isocode,
          idc: this.country.idc,
          currency: this.country.currency
        });
 
        country.$save(function (response) {
          $location.path("countrys/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var country = $scope.country;
 
        country.$update(function () {
          $location.path('countrys/' + country._id);
        });
      };
 
      $scope.find = function (query) {
        Countrys.query(query, function (countrys) {
          $scope.countrys = countrys;
        });
      };
 
      $scope.findOne = function () {
        Countrys.get({ countryId: $routeParams.countryId }, function (country) {
          $scope.country = country;
        });
      };
 
      $scope.remove = function (country) {
        country.$remove();
        for (var i in $scope.countrys) {
          if ($scope.countrys[i] == country) {
            $scope.countrys.splice(i, 1)
          }
        }
      };
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);