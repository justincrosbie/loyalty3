window.angular.module('ngff.controllers.channels', [])
  .controller('ChannelsController', ['$scope','$routeParams','$location','Global','Sites','Datasources','Customers','Channels',
    function($scope, $routeParams, $location, Global, Sites,Datasources,Customers, Channels) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.channel ) {
          this.channel = $scope.tmpchannel;
        }

        var channel = new Channels({ 

          name: this.channel.name ? this.channel.name : null,
          code: this.channel.code ? this.channel.code : null,
          description: this.channel.description ? this.channel.description : null,
          site: this.channel.site ? this.channel.site._id : null,
          datasource: this.channel.datasource ? this.channel.datasource._id : null,
          customer: this.channel.customer ? this.channel.customer._id : null
        });
 
        channel.$save(function (response) {
          $location.path("channels/" + response._id);
        });
      };
 
      $scope.update = function () {
        var channel = $scope.channel;
 
        channel.$update(function () {
          $location.path('channels/' + channel._id);
        });
      };
 
      $scope.find = function (query) {
        Channels.query(query, function (channels) {
          $scope.channels = channels.data;
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

        Channels.query(query, function (channels) {
          $scope.channels = channels.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = channels.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Channels.get({ channelId: $routeParams.channelId }, function (channel) {
          $scope.channel = channel;
          
        });
      };
 
      $scope.remove = function (channel) {
        Channels.get({ channelId: channel._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.channels) {
          if ($scope.channels[i] == channel) {
            $scope.channels.splice(i, 1)
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