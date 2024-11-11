app.controller('ManageContentController', function($scope, $rootScope, $mdDialog) {
    $scope.manageMsg = "This is manage controller";

    $rootScope.quizzes = [

    ];

    $scope.quizSearchType = 'ID';
    $scope.setQuizSearchQueryType = (type) => {
        $scope.quizSearchType = type
    }

    $scope.getQuizData = () => {
        let endpoint = 'collection/' + $scope.quizSearchOption;
        $rootScope.customizeAndCallAPI(endpoint, 'get', '', 'firebase', 'sync')
        .then(function(response) {
            $rootScope.quizzes = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching quiz data:", error);
        });
    }

    $scope.showCorrectAns = (quiz) => {
        $scope.correctOption = Object.values(quiz.quiz.quizOptions)[quiz.quiz.correctAns];
    }



});