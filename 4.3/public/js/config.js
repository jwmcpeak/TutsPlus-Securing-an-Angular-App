app.config(["$routeProvider", "$locationProvider", function ($routes, $location) {
        $location.hashPrefix("!").html5Mode({
            enabled: true,
            requireBase: false
        });
        
        $routes
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        }).when("/login", {
            templateUrl: "/views/login.html",
            controller: "LoginController",
            //requireAuth: true
        }).when("/register", {
            templateUrl: "/views/register.html",
            controller: "RegisterController"
        }).when("/users", {
            templateUrl: "/views/users.html",
            controller: "UserController"
        });;
    }]).run(function ($rootScope) {
    
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.requireAuth) {
            // Auth/session check here
            event.preventDefault();
        }
    });
});