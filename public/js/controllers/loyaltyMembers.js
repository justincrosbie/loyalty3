window.angular.module('ngff.controllers.loyaltyMembers', [])
  .controller('LoyaltyMembersController', ['$scope','$routeParams','$location','Global','Persons','LoyaltySchemes','LoyaltyMembers',
    function($scope, $routeParams, $location, Global, Persons, LoyaltySchemes, LoyaltyMembers) {
 
      $scope.global = Global;
 
      $scope.populateLOVs = function(query) {

        Persons.query(query, function (persons) {
          $scope.persons = persons;
        });
        LoyaltySchemes.query(query, function (loyaltySchemes) {
          $scope.loyaltySchemes = loyaltySchemes;
        });
      };

      $scope.create = function () {
        var loyaltyMember = new LoyaltyMembers({ 
          card: this.loyaltyMember.card,
          password: this.loyaltyMember.password,
          start: this.loyaltyMember.start,
          end: this.loyaltyMember.end,
          loyaltyScheme: this.loyaltyMember.loyaltyScheme,
          person: this.loyaltyMember.person
        });
 
        loyaltyMember.$save(function (response) {
          $location.path("loyaltyMembers/" + response._id);
        });
 
        this.name = "";
      };
 
      $scope.update = function () {
        var loyaltyMember = $scope.loyaltyMember;
 
        loyaltyMember.$update(function () {
          $location.path('loyaltyMembers/' + loyaltyMember._id);
        });
      };
 
      $scope.find = function (query) {
        LoyaltyMembers.query(query, function (loyaltyMembers) {
          $scope.loyaltyMembers = loyaltyMembers;
        });
      };
 
      $scope.findOne = function () {
        LoyaltyMembers.get({ loyaltyMemberId: $routeParams.loyaltyMemberId }, function (loyaltyMember) {
          $scope.loyaltyMember = loyaltyMember;
        });
      };
 
      $scope.remove = function (loyaltyMember) {
        loyaltyMember.$remove();
        for (var i in $scope.loyaltyMembers) {
          if ($scope.loyaltyMembers[i] == loyaltyMember) {
            $scope.loyaltyMembers.splice(i, 1)
          }
        }
      };

      $scope.personFormatSelection = function (person) { 
        return person.firstname + " " + person.lastname;
      }

      $scope.personSelect = {
        placeholder: "Search for a Person",
        minimumInputLength: 3,
        ajax: {
            url: "/persons",
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    q: term.split(' ').length > 1 ? 
                      { 
                        firstname : { $regex: term.split(' ')[0] + '.*', $options: 'i' },
                        lastname : { $regex: term.split(' ')[1] + '.*', $options: 'i' } 
                      } :
                      { 
                        firstname : { $regex: term.split(' ')[0] + '.*', $options: 'i' }
                      }
                    , //search term
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (data, page) {
                var more = (page * 10) < data.length; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: data, more: more};
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (person) { return person.firstname + " " + person.lastname; }, // omitted for brevity, see the source of this page
        formatSelection: $scope.personFormatSelection, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      };

    }]);
