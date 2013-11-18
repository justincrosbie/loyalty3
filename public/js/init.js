window.bootstrap = function () {
    angular.bootstrap(document, ['loyalty3']);
}

window.init = function () {
    window.bootstrap();
}

$(document).ready(function () {
	if (window.location.hash == "#_=_") window.location.hash = "";
    window.init();
<<<<<<< HEAD
});

function onGoogleReady() {
  angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
}
=======
});
>>>>>>> 05644ebd4e842c71a618037d6cf2402b08f74c73
