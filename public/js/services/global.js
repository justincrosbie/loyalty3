window.angular.module('ngff.services.global', [])
  .factory('Global', function(){
    var current_user = window.user;
    var current_app = 'guestmanagement';

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      },
      currentApp: function(app) {
        if ( app ) {
          current_app = app;
        }
        return current_app;
      },
      currentAppName: function() {
        if ( current_app == 'loyalty' ) {
          return 'Loyalty 3.0';
        }
        if ( current_app == 'guestmanagement' ) {
          return 'Guest Management';
        }
        if ( current_app == 'bookingmanagement' ) {
          return 'Booking Management';
        }

        return 'No Name';
      },
      personSelect: {
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
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            alert(id);
            if (id!=="") {
                $.ajax("/persons/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (person) { return person.firstname + " " + person.lastname; }, // omitted for brevity, see the source of this page
        formatSelection: function (person) { return person.firstname + " " + person.lastname; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      },
      schemeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Scheme",
        ajax: {
            url: "/loyaltySchemes",
            results: function (data, page) {
                var more = (page * 10) < data.length;
                return {results: data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            alert(id);
            if (id!=="") {
                $.ajax("/loyaltySchemes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (scheme) { return scheme.name; }, // omitted for brevity, see the source of this page
        formatSelection: function (scheme) { return scheme.name; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      }

    };
  });