app.factory("Session", function () {    
    return {
        getEmail: function() {
            var value = sessionStorage.getItem("email");

            if (value) return value;

            return undefined;
        },
        getIsAdmin: function() {
            var value = sessionStorage.getItem("isAdmin");

            if (value) return value == "true";

            return undefined;
        },
        setUserData: function(user) {
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("email", user.username);

            if (user.isAdmin) {
                sessionStorage.setItem("isAdmin", "true");
            }
        },
        clear: function() {
            sessionStorage.clear();
        }
    };
});