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

    }]);