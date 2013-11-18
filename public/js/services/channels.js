window.angular.module('ngff.services.channels', [])
  .factory('Channels', ['$resource', 
    function($resource){
      return $resource(
        'channels/:channelId', 
        {
          channelId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);