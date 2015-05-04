var app = angular.module("SoundBoardApp", ["ngRoute", "ui.bootstrap", "ngCookies", "ngSanitize"]);

app.controller("SoundBoardController",
[
    "$scope", "Account", "Session",
    function ($scope, account, session) {
        $scope.models = {
            pageTitle: "Welcome to Sound Board!"
        };

        $scope.isLoggedIn = function () {
            return session.getEmail() !== undefined;
        };

        $scope.isAdmin = function () {
            return session.getIsAdmin();
        };

        $scope.getEmail = function () {
            return session.getEmail();
        };

        $scope.logout = function () {
            account.logout();
        };
}]);