  window.angular.module('ngff.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;

		$scope.navbarEntries = [
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

		$scope.navbarAdminEntries = [
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

    }]);