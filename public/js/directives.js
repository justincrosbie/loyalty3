window.angular.module('ngff.directives', [])
  .directive('personselect', function() {
    return {
      restrict: "E",
      templateUrl: "views/persons/personselect.html"
    };
  })
;
