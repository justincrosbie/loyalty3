window.angular.module('ngff.controllers.sites', [])
  .controller('SitesController', ['$scope','$routeParams','$location', '$timeout', 'ngTableParams', 'Global','Customers','Sites',
    function($scope, $routeParams, $location, $timeout, ngTableParams, Global, Customers, Sites) {
 
      $scope.global = Global;
 
      $scope.populateCustomers = function(query) {
        Customers.query(query, function (customers) {
          $scope.customers = customers;
        });
      };
 
      $scope.create = function () {
        var site = new Sites({ 
          name: this.site.name,
          customer: this.site.customer
        });
 
        site.$save(function (response) {
          $location.path("sites/" + response._id);
        });
 
        this.name = "";
        this.customer = "";
      };
 
      $scope.update = function () {
        var site = $scope.site;
 
        site.$update(function () {
          $location.path('sites/' + site._id);
        });
      };
 
      $scope.find = function (query) {
        Sites.query(query, function (sites) {
          $scope.sites = sites.data;
        });
      };
 
      $scope.findOne = function () {
        Sites.get({ siteId: $routeParams.siteId }, function (site) {
          if ( !site.customer ) {
            site.customer = "";
          }
          $scope.site = site;
        });
      };
 
      $scope.remove = function (site) {
        site.$remove();
        for (var i in $scope.sites) {
          if ($scope.sites[i] == site) {
            $scope.sites.splice(i, 1)
          }
        }
      };

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        total: 0,           // length of data
        count: 10,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    });
 
    $scope.$watch('tableParams', function(params) {
        var query = {};

        Sites.query(query, function (sites) {
          $scope.sites = sites.data;
 
          // update table params
          $scope.tableParams.total = sites.count;
        });
    }, true);

}]);