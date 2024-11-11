app.controller('DashboardContentController', function($scope, $rootScope, $mdDialog) {
    // Your specific logic for the dashboard content goes here
    $scope.dashboardMessage = "This is the dashboard content!";
    $scope.quizCategories = ['Raja', 'Category I', 'Code'];
    // $rootScope.quizzes = [

    // ];

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

    // $scope.checkAnswer = function (quiz) {
    //     if (!quiz.selectedOption) {
    //         alert("Please select an option.");
    //         return;
    //     }

    //     var correctOption = Object.values(quiz.quiz.quizOptions)[quiz.quiz.correctAns];
    //     if (quiz.selectedOption === correctOption) {
    //         alert("Correct Answer!");
    //     } else {
    //         alert("Wrong Answer! The correct answer is " + correctOption);
    //     }
    // };

    $scope.getQuizData = () => {
        let endpoint = 'collection/Raja';
        $rootScope.customizeAndCallAPI(endpoint, 'get', '', 'firebase', 'sync')
        .then(function(response) {
            $rootScope.quizzes = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching quiz data:", error);
        });
    }

    $scope.$watch('selectedOption', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.ixoQuiz.correctAns = newValue;
        }
    });

    $scope.save = function () {
        console.log("Form Data Saved:", $scope.ixoQuiz);
        // let endpoint = 'add';
        // let type = 'post';
        // $rootScope.customizeAndCallAPI(endpoint,type, $scope.ixoQuiz, 'firebase');
        // $mdDialog.hide();
    };

    $scope.editQuiz = function (index) {
        $rootScope.isEditQuiz = true;
        $rootScope.quizIndex = index;
        $scope.openDialog();
    }

    //set correct answer
    $scope.setCorrectAns = (correctVal) => {
        $scope.ixoQuiz.correctAns = correctVal;
    }

    $scope.addQuiz = function () {
        $rootScope.isEditQuiz = false;
        $scope.openDialog();
    }

    $scope.openDialog = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../views/templates/quizAddTemp.html',  // External template for dialog content
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true // Allow closing the dialog by clicking outside
        });
    };

    // $scope.quizCategories = ['Raja', 'Category I', 'Code'];

    //opn
    function DialogController($scope, $mdDialog, ApiService, $rootScope) {
        if ($rootScope.isEditQuiz){
            $scope.ixoQuiz = $rootScope.quizzes[$rootScope.quizIndex].quiz;
        }
        else {
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
        }

        $scope.save = function () {
            console.log("Form Data Saved:", $scope.ixoQuiz);
            let endpoint = 'add';
            let type = 'post';
            $rootScope.customizeAndCallAPI(endpoint,type, $scope.ixoQuiz, 'firebase');
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
});