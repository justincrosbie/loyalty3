window.angular.module('ngff.services.companys', [])
  .factory('Companys', ['$resource', 
    function($resource){
      return $resource(
        'companys/:companyId', 
        {
          companyId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);