'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: 'app/users/template.html',
            controller: 'UsersCtrl'
        })
        .when('/users/register', {
            templateUrl: 'app/users/registerForm.html',
            controller: 'UsersRegisterCtrl'
        })
        .when('/users/login', {
            templateUrl: 'app/users/loginForm.html',
            controller: 'UsersLoginCtrl'
        });
}])

.controller('UsersCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
        // User
        var User = $resource('/api/v1/users/:userId');

        // We can retrieve a collection from the server
        User.query(function(res) {
            console.log(res)
            $scope.users = res;
        });

        $scope.logout = function() {
            var Auth = $resource('/api/v1/users/auth');
            Auth.delete($scope.form, function(user, param) {
                $location.path('/users')
            })
        }
    }])
    .controller('UsersRegisterCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
        var User = $resource('/api/v1/users/:userId');
        $scope.submit = function() {
            console.log($scope.form)
            User.save($scope.form, function(user, param) {
                console.log('saved', user, param)
                $location.path('/users')
            })
        }
    }])

.controller('UsersLoginCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
    var Auth = $resource('/api/v1/users/auth');
    $scope.submit = function() {
        Auth.save($scope.form, function(user, param) {
            console.log('saved', user, param)
            $location.path('/users')
        })
    }
}]);