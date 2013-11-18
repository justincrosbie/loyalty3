window.bootstrap = function () {
    angular.bootstrap(document, ['loyalty3']);
}

window.init = function () {
    window.bootstrap();
}

$(document).ready(function () {
	if (window.location.hash == "#_=_") window.location.hash = "";
    window.init();
});

function onGoogleReady() {
  angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
}
