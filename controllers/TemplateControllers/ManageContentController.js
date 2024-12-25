app.controller('ManageContentController', function($scope, $rootScope, $mdDialog) {
    $scope.manageMsg = "This is manage controller";
    $rootScope.isEditQuiz = false;
    $rootScope.quizzes = [

    ];
    $scope.quizSearchType = 'CATEGORY';
    $scope.isCategorySearch = true;
    $scope.setQuizSearchQueryType = (type) => {
        (type === 'CATEGORY') ? $scope.isCategorySearch = true : $scope.isCategorySearch = false;
        $scope.quizSearchType = type
    }

    $scope.getQuizData = () => {
        let endpoint;
        if($scope.quizSearchType === 'ID')
            endpoint = $scope.searchCategoryTxt + "/" + $scope.quizSearchOption;
        else if($scope.quizSearchType === 'CATEGORY')
            endpoint = 'collection/' + $scope.searchCategoryTxt;
        
        $rootScope.customizeAndCallAPI(endpoint, 'get', '', 'firebase', 'sync')
        .then(function(response) {
            if($scope.quizSearchType === 'ID')
                $rootScope.quizzes.push(response.data);
            else if($scope.quizSearchType === 'CATEGORY')
                $rootScope.quizzes = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching quiz data:", error);
        });
    }

    $scope.showCorrectAns = (quiz) => {
        $scope.correctOption = Object.values(quiz.quiz.quizOptions)[quiz.quiz.correctAns];
    }

    $scope.editQuiz = function (index) {
        $rootScope.isEditQuiz = true;
        $rootScope.quizIndex = index;
        $scope.openDialog();
    }

    $scope.deleteQuiz = (index) => {
        let deleteConfirm = confirm("Do you want to delete this Quiz");
        console.log(deleteConfirm);
        
        if(deleteConfirm){
            $scope.collectionName = $rootScope.quizzes[index].collectionName;
            $scope.quizId = $rootScope.quizzes[index].quizId;
            let endpoint = 'delete?collectionName=' + $scope.collectionName + '&quizId=' + $scope.quizId;
            let type = 'delete';
            $rootScope.customizeAndCallAPI(endpoint,type, null, 'firebase');
        }
    }

});