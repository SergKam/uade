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
    .factory('userApi', ['$resource', function($resource) {
        return $resource('/api/v1/users/:userId');
    }])
    .factory('authApi', ['$resource', function($resource) {
        return $resource('/api/v1/users/auth');
    }])
    .factory('currentUserModel', ['authApi', function(authApi) {
        var user = {
            properties: {},
            setProperties: function(obj) {
                this.properties = obj;
            },

            logout: function() {
                authApi.delete();
                this.setProperties({})
            },

            isLoggedIn: function() {
                return !!this.properties.email
            },
            query: function(cb) {
                cb = cb || function(err, data) {
                    };

                authApi.get(function(res) {
                    user.setProperties(res);
                    cb(null, res);
                }, cb)
            }
        };

        user.query();

        return user;
    }])
    .controller('UsersCtrl', ['$scope', 'userApi', 'authApi', '$location', function($scope,
                                                                                    userApi,
                                                                                    authApi,
                                                                                    $location) {
        // We can retrieve a collection from the server
        userApi.query(function(res) {
            $scope.users = res;
        });

        $scope.logout = function() {
            authApi.delete($scope.form, function(user, param) {
                $location.path('/users')
            })
        }
    }])
    .controller('UsersRegisterCtrl', ['$scope', 'userApi', '$location', function($scope, userApi, $location) {
        $scope.submit = function() {
            userApi.save($scope.form, function(user, param) {
                $location.path('/users')
            })
        }
    }])
    .controller('UsersLoginCtrl', ['$scope', 'authApi', '$location', 'currentUserModel', function($scope,
                                                                                                  authApi,
                                                                                                  $location,
                                                                                                  currentUserModel) {
        $scope.submit = function() {
            $scope.error = false;
            authApi.save($scope.form, function(user, param) {
                    $scope.error = false;
                    currentUserModel.setProperties(user);
                    $location.path('/users')
                }, function() {
                    $scope.error = true;
                }
            )
        }
    }])
    .directive('userStatus', ['currentUserModel', function(currentUserModel) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            link: function($scope, $element, $attributes) {
                $scope.user = currentUserModel;
                $scope.run = function() {
                    console.log(currentUserModel);
                }
            },
            templateUrl: 'app/users/statusControl.html'
        }
    }])
;
