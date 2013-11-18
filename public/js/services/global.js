<<<<<<< HEAD
window.angular.module('ngff.services.global', [])
  .factory('Global', function(){
    var current_user = window.user;
    var apps = ['guestmanagement','bookingmanagement','loyalty'];
    var current_app = apps[0];

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      },
      introMessage: function(m) {
        if ( m ) {
          msg = m;
        }
        return msg;
      },
      currentApp: function(app) {
        if ( app ) {
          current_app = app;
        }
        return current_app;
      },
      currentAppName: function() {

        if ( current_app == 'guestmanagement' ) {
          return 'Guest Management';
        }

        if ( current_app == 'bookingmanagement' ) {
          return 'Booking Management';
        }

        if ( current_app == 'loyalty' ) {
          return 'Loyalty Management';
        }
     return 'No Name';
      }

      ,countrySelect: {
        placeholder: "Search for a Country",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/countrys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','iso'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/countrys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.iso; },
        formatSelection: function (result) { return result.name + " " + result.iso; },
        escapeMarkup: function (m) { return m; }     
      }

      ,currencySelect: {
        placeholder: "Search for a Currency",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/currencys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','iso'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/currencys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.iso; },
        formatSelection: function (result) { return result.name + " " + result.iso; },
        escapeMarkup: function (m) { return m; }     
      }

      ,ratecodeSelect: {
        placeholder: "Search for a Ratecode",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/ratecodes",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/ratecodes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.code; },
        formatSelection: function (result) { return result.name + " " + result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,marketcodeSelect: {
        placeholder: "Search for a Marketcode",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/marketcodes",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/marketcodes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.code; },
        formatSelection: function (result) { return result.name + " " + result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,roomSelect: {
        placeholder: "Search for a Room",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/rooms",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/rooms/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.code; },
        formatSelection: function (result) { return result.name + " " + result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,rawcompanySelect: {
        placeholder: "Search for a Rawcompany",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/rawcompanys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/rawcompanys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,rawpersonSelect: {
        placeholder: "Search for a Rawperson",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/rawpersons",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['firstname','middlename','lastname'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/rawpersons/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        formatSelection: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        escapeMarkup: function (m) { return m; }     
      }

      ,bookingSelect: {
        placeholder: "Search for a Booking",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/bookings",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/bookings/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.code; },
        formatSelection: function (result) { return result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,revenueSelect: {
        placeholder: "Search for a Revenue",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/revenues",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = [];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/revenues/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return ; },
        formatSelection: function (result) { return ; },
        escapeMarkup: function (m) { return m; }     
      }

      ,companySelect: {
        placeholder: "Search for a Company",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/companys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/companys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,personSelect: {
        placeholder: "Search for a Person",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/persons",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['firstname','middlename','lastname'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/persons/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        formatSelection: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        escapeMarkup: function (m) { return m; }     
      }

      ,loyaltyMemberSelect: {
        placeholder: "Search for a LoyaltyMember",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/loyaltyMembers",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/loyaltyMembers/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.code; },
        formatSelection: function (result) { return result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,loyaltyPointSelect: {
        placeholder: "Search for a LoyaltyPoint",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/loyaltyPoints",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/loyaltyPoints/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.code; },
        formatSelection: function (result) { return result.name + " " + result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,loyaltyStatementSelect: {
        placeholder: "Search for a LoyaltyStatement",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/loyaltyStatements",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','code'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/loyaltyStatements/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.code; },
        formatSelection: function (result) { return result.name + " " + result.code; },
        escapeMarkup: function (m) { return m; }     
      }

      ,loyaltyTransactionSelect: {
        placeholder: "Search for a LoyaltyTransaction",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/loyaltyTransactions",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = [];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
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
            if (id!=="") {
                $.ajax("/loyaltyTransactions/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return ; },
        formatSelection: function (result) { return ; },
        escapeMarkup: function (m) { return m; }     
      }
      


      ,customerSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Customer",
        allowClear: true,
        ajax: {
            url: "/customers",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/customers/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
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
            if (id!=="") {
                $.ajax("/sites/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,datasourcetypeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Datasourcetype",
        allowClear: true,
        ajax: {
            url: "/datasourcetypes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/datasourcetypes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,datasourceSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Datasource",
        allowClear: true,
        ajax: {
            url: "/datasources",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/datasources/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,subscriptionSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Subscription",
        allowClear: true,
        ajax: {
            url: "/subscriptions",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/subscriptions/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,titleSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Title",
        allowClear: true,
        ajax: {
            url: "/titles",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/titles/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,bookingstatusSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Bookingstatus",
        allowClear: true,
        ajax: {
            url: "/bookingstatuss",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/bookingstatuss/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,bookingtypeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Bookingtype",
        allowClear: true,
        ajax: {
            url: "/bookingtypes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/bookingtypes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,channelSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Channel",
        allowClear: true,
        ajax: {
            url: "/channels",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/channels/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,sobSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Sob",
        allowClear: true,
        ajax: {
            url: "/sobs",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/sobs/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,roomtypeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Roomtype",
        allowClear: true,
        ajax: {
            url: "/roomtypes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/roomtypes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,paymenttypeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Paymenttype",
        allowClear: true,
        ajax: {
            url: "/paymenttypes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/paymenttypes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,revenuetypeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Revenuetype",
        allowClear: true,
        ajax: {
            url: "/revenuetypes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/revenuetypes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,revenuecodeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Revenuecode",
        allowClear: true,
        ajax: {
            url: "/revenuecodes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/revenuecodes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,loyaltySchemeSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a LoyaltyScheme",
        allowClear: true,
        ajax: {
            url: "/loyaltySchemes",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/loyaltySchemes/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }
      

    };
=======
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
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
  });