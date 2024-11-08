app.service('ApiService', function($http, $rootScope) {
   

    this.performPostApiCall = function(apiUrl, data) {
        return $http.post(apiUrl, data); 
    };

    this.performGetApiCall = (apiUrl) => {
        return $http.get(apiUrl);
    };

    this.performGetApiCallSync = (apiUrl) => {
        return $http.get(apiUrl)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        })
    };
});