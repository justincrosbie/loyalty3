window.angular.module('ngff.controllers.bookings', [])
  .controller('BookingsController', ['$scope','$routeParams','$location','Global','Bookingstatuss','Bookingtypes','Rooms','Ratecodes','Marketcodes','Channels','Sobs','Rawpersons','Rawcompanys','Sites','Datasources','Customers','Bookings',
    function($scope, $routeParams, $location, Global, Bookingstatuss,Bookingtypes,Rooms,Ratecodes,Marketcodes,Channels,Sobs,Rawpersons,Rawcompanys,Sites,Datasources,Customers, Bookings) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmpbooking) {
        $scope.tmpbooking = tmpbooking;
      }

      $scope.codesSelected = function(tmpbooking) {
        $scope.tmpbooking = tmpbooking;
      }

      $scope.create = function () {

        if ( !this.booking ) {
          this.booking = $scope.tmpbooking;
        }

        var booking = new Bookings({ 

          code: this.booking.code ? this.booking.code : null,
          status: this.booking.status ? this.booking.status._id : null,
          type: this.booking.type ? this.booking.type._id : null,
          datebooked: this.booking.datebooked ? this.booking.datebooked : null,
          start: this.booking.start ? this.booking.start : null,
          end: this.booking.end ? this.booking.end : null,
          room: this.booking.room ? this.booking.room._id : null,
          comments: this.booking.comments ? this.booking.comments : null,
          ratecode: this.booking.ratecode ? this.booking.ratecode._id : null,
          marketcode: this.booking.marketcode ? this.booking.marketcode._id : null,
          channel: this.booking.channel ? this.booking.channel._id : null,
          sob: this.booking.sob ? this.booking.sob._id : null,
          person: this.booking.person ? this.booking.person._id : null,
          company: this.booking.company ? this.booking.company._id : null,
          site: this.booking.site ? this.booking.site._id : null,
          datasource: this.booking.datasource ? this.booking.datasource._id : null,
          customer: this.booking.customer ? this.booking.customer._id : null
        });
 
        booking.$save(function (response) {
          $location.path("bookings/" + response._id);
        });
      };
 
      $scope.update = function () {
        var booking = $scope.booking;
 
        booking.$update(function () {
          $location.path('bookings/' + booking._id);
        });
      };
 
      $scope.find = function (query) {
        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['code'];
      var sortFields = ['code','datebooked'];

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

  		
        if ( $scope.statusSearch ) {
          	q2val.status = $scope.statusSearch._id;
        }
        if ( $scope.typeSearch ) {
          	q2val.type = $scope.typeSearch._id;
        }
        if ( $scope.roomSearch ) {
          	q2val.room = $scope.roomSearch._id;
        }
        if ( $scope.ratecodeSearch ) {
          	q2val.ratecode = $scope.ratecodeSearch._id;
        }
        if ( $scope.marketcodeSearch ) {
          	q2val.marketcode = $scope.marketcodeSearch._id;
        }
        if ( $scope.channelSearch ) {
          	q2val.channel = $scope.channelSearch._id;
        }
        if ( $scope.sobSearch ) {
          	q2val.sob = $scope.sobSearch._id;
        }
        if ( $scope.personSearch ) {
          	q2val.person = $scope.personSearch._id;
        }
        if ( $scope.companySearch ) {
          	q2val.company = $scope.companySearch._id;
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

        Bookings.query(query, function (bookings) {
          $scope.bookings = bookings.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = bookings.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Bookings.get({ bookingId: $routeParams.bookingId }, function (booking) {
          $scope.booking = booking;
          
          if ( $scope.booking && $scope.booking.datebooked ) {
            $scope.booking.datebooked = new Date($scope.booking.datebooked);
          }
          if ( $scope.booking && $scope.booking.start ) {
            $scope.booking.start = new Date($scope.booking.start);
          }
          if ( $scope.booking && $scope.booking.end ) {
            $scope.booking.end = new Date($scope.booking.end);
          }
        });
      };
 
      $scope.remove = function (booking) {
        Bookings.get({ bookingId: booking._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.bookings) {
          if ($scope.bookings[i] == booking) {
            $scope.bookings.splice(i, 1)
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