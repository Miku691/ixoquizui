let app = angular.module("ixoQuizUI", ['ngRoute', 'ngMaterial', 'ngMessages']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $rootScope) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        }).
        otherwise({
            redirectTo: '/login'
        });
    $locationProvider.hashPrefix('');
}
]);



app.controller('appController', ($rootScope, FirebaseAppService) => {

    function init(){
        if (FirebaseAppService.checkUserLoginState()) {
            $rootScope.userLogedIn = true;
            var path = window.location.href.split("#")[0] + "#/" + 'dashboard';
            window.open(path, "_self");
        }
        else {
            var path = window.location.href.split("#")[0] + "#/" + 'login';
            window.open(path, "_self");
        }
    }

    init();
})