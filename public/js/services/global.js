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
      }
      ,personSelect: {
        placeholder: "Search for a Person",
        minimumInputLength: 3,
        allowClear: true,
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
      }
      ,companySelect: {
        placeholder: "Search for a Company",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/companys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    q: { 
                        name : { $regex: term + '.*', $options: 'i' }
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
                $.ajax("/companys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (company) { return company.name; }, // omitted for brevity, see the source of this page
        formatSelection: function (company) { return company.name; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      }
      ,schemeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Scheme",
        allowClear: true,
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
      ,titleSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Title",
        allowClear: true,
        ajax: {
            url: "/titles",
            results: function (data, page) {
                var more = (page * 10) < data.length;
                return {results: data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            alert(id);
            if (id!=="") {
                $.ajax("/titles/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (title) { return title.name; }, // omitted for brevity, see the source of this page
        formatSelection: function (title) { return title.name; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      }
      ,customerSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Customer",
        allowClear: true,
        ajax: {
            url: "/customers",
            results: function (data, page) {
                var more = (page * 10) < data.length;
                return {results: data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            alert(id);
            if (id!=="") {
                $.ajax("/customers/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (customer) { return customer.name; }, // omitted for brevity, see the source of this page
        formatSelection: function (customer) { return customer.name; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      }
      ,siteSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Site",
        allowClear: true,
        ajax: {
            url: "/sites",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            alert(id);
            if (id!=="") {
                $.ajax("/sites/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (site) { return site.name; }, // omitted for brevity, see the source of this page
        formatSelection: function (site) { return site.name; }, // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displayi        
      }

    };
  });