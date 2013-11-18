window.angular.module('ngff.services.subscriptions', [])
  .factory('Subscriptions', ['$resource', 
    function($resource){
      return $resource(
        'subscriptions/:subscriptionId', 
        {
          subscriptionId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);