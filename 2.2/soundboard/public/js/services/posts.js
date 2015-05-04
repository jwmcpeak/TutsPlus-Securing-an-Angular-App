app.factory("Posts", ["$http", "$q", "Session", function ($http, $q, session) {
    var postService = {};
        
    postService.getPosts = function () {
        return $http
            .get("/api/posts")
            .then(function(res) {
                return res.data;
            });
    };
        
    postService.savePost = function (id, title, message) {
        var result = $q.defer();
        
        $http({
            method: id === undefined ? "POST" : "PUT",
            url: "/api/posts",
            data: { id: id, title: title, message: message },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.getToken()
            }
        }).success(function (res) {
            return result.resolve(res);
        }).error(function (res) {
            return result.reject(res);
        });

        return result.promise;
    };

    return postService;
}]);