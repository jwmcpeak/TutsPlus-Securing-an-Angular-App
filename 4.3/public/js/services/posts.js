app.factory("Posts", ["$http", "$q", "Session", function ($http, $q, session) {
    var postService = {};
    
    var transformData = function (obj) {
            var str = [];
            
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            
            return str.join("&");
        };
        
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
            transformRequest: transformData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).success(function (res) {
            return result.resolve(res);
        }).error(function (res) {
            return result.reject(res);
        });

        return result.promise;
    };

    return postService;
}]);