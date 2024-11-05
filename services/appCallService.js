app.service('ApiService', function($http, $rootScope) {
    var apiUrl = 'http://localhost:8080/api/quiz/add'; 

    this.saveDialogData = function(data) {
        return $http.post(apiUrl, data); 
    };

    this.getAllQuizes = (category) => {
        let apiUrl = 'http://localhost:8080/api/quiz/collection/'+category;

        $http.get(apiUrl) 
        .then(function(response) {
            $rootScope.quizzes = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching quiz data:", error);
        });
    }
});