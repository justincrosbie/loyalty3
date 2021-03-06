window.angular.module('ngff.controllers.bookingscalendar', [])
  .controller('BookingsCalendarController', ['$scope', 'Global', 'Bookings',
    function($scope, Global, Bookings) {
      $scope.global = Global;


	    var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();

	    /* event source that contains custom events on the scope */
	    $scope.events2 = [
	      {title: 'All Day Event',start: new Date(y, m, 1)},
	      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	    ];

	    $scope.events = [];

	      $scope.findBookings = function (query) {
	        Bookings.query(query, function (bookings) {
	          for ( var i=0; i<bookings.data.length; i++ ) {
			      $scope.events.push({
			        title: bookings.data[i].site.name + ": " + 
			        		bookings.data[i].person.firstname + " " + bookings.data[i].person.lastname,
			        start: new Date(bookings.data[i].start),
			        end: new Date(bookings.data[i].end),
			        className: ['newBooking']
			      });
	          }
	        });
	      };
	 
	    /* event source that calls a function on every view switch */
	    $scope.eventsF = function (start, end, callback) {
	      var s = new Date(start).getTime() / 1000;
	      var e = new Date(end).getTime() / 1000;
	      var m = new Date(start).getMonth();
	      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	      callback(events);
	    };
	    /* alert on eventClick */
	    $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
	        $scope.$apply(function(){
	          alert('Day Clicked ' + date);
	          $scope.alertMessage = ('Day Clicked ' + date);
	        });
	    };
	    /* alert on Drop */
	     $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
	        $scope.$apply(function(){
	          alert('Event Dropped to make dayDelta ' + dayDelta);
	          $scope.alertMessage = ('Event Dropped to make dayDelta ' + dayDelta);
	        });
	    };
	    /* alert on Resize */
	    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
	        $scope.$apply(function(){
	          alert('Event Resized to make dayDelta ' + minuteDelta);
	          $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
	        });
	    };
	    /* add and removes an event source of choice */
	    $scope.addRemoveEventSource = function(sources,source) {
	      var canAdd = 0;
	      angular.forEach(sources,function(value, key){
	        if(sources[key] === source){
	          sources.splice(key,1);
	          canAdd = 1;
	        }
	      });
	      if(canAdd === 0){
	        sources.push(source);
	      }
	    };
	    /* add custom event*/
	    $scope.addEvent = function() {
	      $scope.events.push({
	        title: 'Open Sesame',
	        start: new Date(y, m, 28),
	        end: new Date(y, m, 29),
	        className: ['openSesame']
	      });
	    };
	    /* remove event */
	    $scope.remove = function(index) {
	      $scope.events.splice(index,1);
	    };
	    /* Change View */
	    $scope.changeView = function(view, calendar) {
	      calendar.fullCalendar('changeView',view);
	    };
	    /* config object */
	    $scope.uiConfig = {
	      calendar:{
	        height: 450,
	        editable: true,
	        header:{
	          left: 'month basicWeek basicDay agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        dayClick: $scope.alertEventOnClick,
	        eventDrop: $scope.alertOnDrop,
	        eventResize: $scope.alertOnResize
	      }
	    };
	    /* event sources array*/
	    $scope.eventSources = [$scope.events];

	}]);