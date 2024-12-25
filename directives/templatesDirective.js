app.directive('dashboardContent', function() {
    return {
        restrict: 'E',
        templateUrl: '../ixoquizui/views/templates/dashboard-content.html',
        controller: 'DashboardContentController'
    };
});

app.directive('manageContent', function() {
    return {
        restrict: 'E',
        templateUrl: '../ixoquizui/views/templates/manage-content.html',
        controller: 'ManageContentController'
    };
});
