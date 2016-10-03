module.exports = function(app) {
    app.factory('interseptorAuth', ['$q', '$location', function($q, $location) {
        var responseInterceptor = {
            responseError: function(response) {
                if (response.status == 401) {
                    $location.path('/login')
                }
                return $q.reject(response);
            }
        };

        return responseInterceptor;
    }]);
}