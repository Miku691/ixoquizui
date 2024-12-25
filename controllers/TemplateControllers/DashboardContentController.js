app.controller('DashboardContentController', function($scope, $rootScope, $mdDialog) {
    // Your specific logic for the dashboard content goes here
    $scope.dashboardMessage = "This is the dashboard content!";

    //initialize quiz object..
    $scope.ixoQuiz = {
        question: 'Question',
        quizOptions: {
            option_I: 'today',
            option_II: 'noday',
            option_III: 'yesday',
            option_IV: 'okday'
        },
        correctAns: 2,
        ansDescription: 'this is ans desc',
        category: 'Demo'
    }


    $scope.$watch('selectedOption', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ixoQuiz.correctAns = newValue;
        }
    });


    //set correct answer
    $scope.setCorrectAns = (correctVal) => {
        $scope.ixoQuiz.correctAns = correctVal;
    }

    // add quiz will called from view and it will open dialog present in dashboardController
    $scope.addQuiz = function () {
        $rootScope.isEditQuiz = false;
        $rootScope.saveIxoQuizData = $scope.ixoQuiz;
        $scope.openDialog();
    }
});