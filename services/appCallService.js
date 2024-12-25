app.service('ApiService', function($http, $rootScope) {
   
    var config = {
        headers: {
            'Authorization': "Basic bWlrdTEyM0BnbWFpbC5jb206TWlrdQ==",
            'Content-Type': 'application/json'
        }
    }

    this.performPostApiCall = function(apiUrl, data) {
        return $http.post(apiUrl, data, config); 
    };

    this.performPutApiCall = function(apiUrl, data) {
        return $http.put(apiUrl, data, config); 
    };

    this.performDeleteApiCall = function(apiUrl) {
        return $http.delete(apiUrl, config); 
    };

    this.performGetApiCall = (apiUrl) => {
        return $http.get(apiUrl, config);
    };

    this.performGetApiCallSync = (apiUrl) => {
        return $http.get(apiUrl, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        })
    };
});