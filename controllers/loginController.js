app.controller("loginController",['$scope', 'FirebaseAppService', 
    function($scope,FirebaseAppService, $rootScope, $location){
        $scope.login = function(){
            let firebaseApp = FirebaseAppService.firebaseAppConfig();
            FirebaseAppService.firebaseAuthSignIn(firebaseApp, $scope.email, $scope.pwd)
            .then((userCredential) => {
                console.log(userCredential.user);
                var path = window.location.href.split("#")[0] + "#/" + 'dashboard';
                window.open(path, "_self");
              })
              .catch((error) => {
                console.log('Error code ' + error.code);
                console.log('Error desc ' + error.message)
              });
        }
}])