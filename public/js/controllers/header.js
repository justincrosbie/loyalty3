<<<<<<< HEAD
  window.angular.module('ngff.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;
 		$scope.currentAppName = Global.currentAppName();

      $scope.changeNavbar = function(link) {

        $scope.navbarEntries = $scope.apps[link].navbarEntries;
        $scope.navbarAdminEntries = $scope.apps[link].navbarAdminEntries;

      	Global.currentApp(link);
      	Global.introMessage($scope.apps[link].description);
 		$scope.currentAppName = Global.currentAppName();
      }
 

		$scope.apps = {

		  "guestmanagement":
		  {
		    "title": "Guest Management",
		    "link": "guestmanagement",
		    "description": "Guest Management is cool!",
		    "navbarEntries": 
		    [
		      
			  {
			    "title": "Customers",
			    "link": "customers"
			  },
			  {
			    "title": "Sites",
			    "link": "sites"
			  },
			  {
			    "title": "Companys",
			    "link": "companys"
			  },
			  {
			    "title": "Persons",
			    "link": "persons"
			  }
			],
			"navbarAdminEntries":
			[
		      
			  {
			    "title": "Subscriptions",
			    "link": "subscriptions"
			  },
			  {
			    "title": "Currencys",
			    "link": "currencys"
			  },
			  {
			    "title": "Countrys",
			    "link": "countrys"
			  },
			  {
			    "title": "Titles",
			    "link": "titles"
			  }
			]
		  },"bookingmanagement":
		  {
		    "title": "Booking Management",
		    "link": "bookingmanagement",
		    "description": "In Booking Management, you can administer the raw records entering the application",
		    "navbarEntries": 
		    [
		      
			  {
			    "title": "Raw Companys",
			    "link": "rawcompanys"
			  },
			  {
			    "title": "Raw Persons",
			    "link": "rawpersons"
			  },
			  {
			    "title": "Bookings",
			    "link": "bookings"
			  },
			  {
			    "title": "Calendar",
			    "link": "bookingsCalendar"
			  },
			  {
			    "title": "Map",
			    "link": "bookingsMap"
			  },
			  {
			    "title": "Revenues",
			    "link": "revenues"
			  }
			],
			"navbarAdminEntries":
			[
		      
			  {
			    "title": "Booking Types",
			    "link": "bookingtypes"
			  },
			  {
			    "title": "Booking Statuses",
			    "link": "bookingstatuss"
			  },
			  {
			    "title": "Rate Codes",
			    "link": "ratecodes"
			  },
			  {
			    "title": "Market Codes",
			    "link": "marketcodes"
			  },
			  {
			    "title": "Channels",
			    "link": "channels"
			  },
			  {
			    "title": "Sources of Business",
			    "link": "sobs"
			  },
			  {
			    "title": "Room Types",
			    "link": "roomtypes"
			  },
			  {
			    "title": "Rooms",
			    "link": "rooms"
			  },
			  {
			    "title": "Payment Types",
			    "link": "paymenttypes"
			  },
			  {
			    "title": "Revenue Codes",
			    "link": "revenuecodes"
			  },
			  {
			    "title": "Data Source Types",
			    "link": "datasourcetypes"
			  },
			  {
			    "title": "Data Sources",
			    "link": "datasources"
			  }
			]
		  },"loyalty":
		  {
		    "title": "Loyalty Management",
		    "link": "loyalty",
		    "description": "Loyalty 3.0 goes beyond traditional Loyalty systems to provide a more compelling and immersive experience for your customers, by leveraging state-of-the-art gamification techniques",
		    "navbarEntries": 
		    [
		      
			  {
			    "title": "Members",
			    "link": "loyaltyMembers"
			  },
			  {
			    "title": "Points",
			    "link": "loyaltyPoints"
			  },
			  {
			    "title": "Transactions",
			    "link": "loyaltyTransactions"
			  },
			  {
			    "title": "Statements",
			    "link": "loyaltyStatements"
			  },
			  {
			    "title": "Reports",
			    "link": "loyaltyReports"
			  }
			],
			"navbarAdminEntries":
			[
		      
			  {
			    "title": "Schemes",
			    "link": "loyaltySchemes"
			  },
			  {
			    "title": "Reports Config",
			    "link": "loyaltyReports"
			  }
			]
		  }
		};
		
		var appsArray = ['guestmanagement','bookingmanagement','loyalty'];

		$scope.navbarEntries = $scope.apps[appsArray[0]].navbarEntries;
		$scope.navbarAdminEntries = $scope.apps[appsArray[0]].navbarAdminEntries;

=======
  window.angular.module('ngff.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;
 		$scope.currentAppName = Global.currentAppName();

      $scope.changeNavbar = function(link) {

      	if ( link == 'loyalty' ) {
	        $scope.navbarEntries = $scope.navbarEntries2;
	        $scope.navbarAdminEntries = $scope.navbarAdminEntries2;
      	} else if ( link == 'bookingmanagement' ) {
	        $scope.navbarEntries = $scope.navbarEntries3;
	        $scope.navbarAdminEntries = $scope.navbarAdminEntries3;
      	} else {
	        $scope.navbarEntries = $scope.navbarEntries1;
	        $scope.navbarAdminEntries = $scope.navbarAdminEntries1;
      	}

      	Global.currentApp(link);
 		$scope.currentAppName = Global.currentAppName();
      }
 

		$scope.apps = [
		  {
		    "title": "Guest Management",
		    "link": "guestmanagement"
		  },
		  {
		    "title": "Booking Management",
		    "link": "bookingmanagement"
		  },
		  {
		    "title": "Loyalty 3.0",
		    "link": "loyalty"
		  }
		];


		$scope.navbarEntries1 = [
		  {
		    "title": "Customers",
		    "link": "customers"
		  },
		  {
		    "title": "Sites",
		    "link": "sites"
		  },
		  {
		    "title": "Companys",
		    "link": "companys"
		  },
		  {
		    "title": "Persons",
		    "link": "persons"
		  }
		];

		$scope.navbarAdminEntries1 = [
		  {
		    "title": "Subscriptions",
		    "link": "subscriptions"
		  },
		  {
		    "title": "Currencys",
		    "link": "currencys"
		  },
		  {
		    "title": "Countrys",
		    "link": "countrys"
		  },
		  {
		    "title": "Titles",
		    "link": "titles"
		  }
		];

		$scope.navbarEntries2 = [
			  {
			    "title": "Members",
			    "link": "loyaltyMembers"
			  },
			  {
			    "title": "Points",
			    "link": "loyaltyPoints"
			  },
			  {
			    "title": "Transactions",
			    "link": "loyaltyTransactions"
			  },
			  {
			    "title": "Statements",
			    "link": "loyaltyStatements"
			  },
			  {
			    "title": "Reports",
			    "link": "loyaltyReports"
			  }
			];

		$scope.navbarAdminEntries2 = [
			  {
			    "title": "Schemes",
			    "link": "loyaltySchemes"
			  },
			  {
			    "title": "Reports",
			    "link": "loyaltyReports"
			  }
			];

		$scope.navbarEntries3 = [
			  {
			    "title": "Raw Companys",
			    "link": "rawcompanys"
			  },
			  {
			    "title": "Raw Person",
			    "link": "rawpersons"
			  },
			  {
			    "title": "Bookings",
			    "link": "bookings"
			  },
			  {
			    "title": "Revenue Transactions",
			    "link": "revenues"
			  }
			];

		$scope.navbarAdminEntries3 = [
			  {
			    "title": "Rate Codes",
			    "link": "ratecodes"
			  },
			  {
			    "title": "Market Codes",
			    "link": "marketcodes"
			  },
			  {
			    "title": "Revenue Codes",
			    "link": "revenuecodes"
			  },
			  {
			    "title": "Booking Types",
			    "link": "bookingtypes"
			  },
			  {
			    "title": "Booking Statuses",
			    "link": "bookingstatuses"
			  }
			];

		$scope.navbarEntries = $scope.navbarEntries1;
		$scope.navbarAdminEntries = $scope.navbarAdminEntries1;

>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
    }]);