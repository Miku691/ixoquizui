let app = angular.module("ixoQuizUI", ['ngRoute', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

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



app.controller('appController', ($scope, $rootScope, FirebaseAppService, ApiService) => {

    $scope.init = function () {

        //define service call details
        $scope.baseUrlFirebaseService = 'http://localhost:8080/api/quiz/';
        $scope.baseUrlSqliteService = 'http://localhost:9090/api/';
        $scope.checkUserLogedState();
    }

    $rootScope.customizeAndCallAPI = (endpoint, type, data, microServiceType, callingType) => {
        if(microServiceType === 'firebase')
            $scope.serviceApi = $scope.baseUrlFirebaseService + endpoint;
        else if(microServiceType === 'sqlite')
            $scope.serviceApi = $scope.baseUrlSqliteService + endpoint;

        if(type === 'post'){
            ApiService.performPostApiCall($scope.serviceApi, data)
            .then(function (response) {
                console.log("Dialog saved:", response);
                $mdDialog.hide();
            })
            .catch(function (error) {
                console.error("Error saving dialog:", error);
            });
        }
        else if(type === 'get'){
            if(callingType == 'async')
                return ApiService.performGetApiCallSync($scope.serviceApi);
            else if(callingType === 'sync')
                return ApiService.performGetApiCall($scope.serviceApi);
        }
    }

    $scope.checkUserLogedState = async () => {
        const user = await FirebaseAppService.checkUserLoginState();
        if (user) {
            $rootScope.userLogedIn = true;
            var path = window.location.href.split("#")[0] + "#/" + 'dashboard';
            window.open(path, "_self");
        }
        else {
            var path = window.location.href.split("#")[0] + "#/" + 'login';
            window.open(path, "_self");
        }
    }

    $scope.init();
})