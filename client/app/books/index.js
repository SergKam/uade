'use strict';

angular.module('myApp.books', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/books', {
                templateUrl: 'app/books/template.html',
                controller: 'BooksCtrl'
            })
            .when('/books/register', {
                templateUrl: 'app/books/registerForm.html',
                controller: 'BooksRegisterCtrl'
            })
            .when('/books/details/:bookId', {
                templateUrl: 'app/books/details.html',
                controller: 'BooksDetailsCtrl'
            })
    }])
    .factory('bookApi', ['$resource', function($resource) {
        return $resource('/api/v1/books/:bookId');
    }])
    .controller('BooksCtrl', ['$scope', 'bookApi', 'authApi', '$location', function($scope,
                                                                                    bookApi,
                                                                                    authApi,
                                                                                    $location) {


        // We can retrieve a collection from the server
        bookApi.query(function(res) {
            $scope.books = res;
        }, function(err) {
            if (err.status === 401) {
                $location.search('back', $location.path());
                $location.path('/users/login')
            }

        });
    }])
    .controller('BooksRegisterCtrl', ['$scope', 'bookApi', '$location', function($scope, bookApi, $location) {
        $scope.submit = function() {
            bookApi.save($scope.form, function(book, param) {
                $location.path('/books')
            })
        }
    }])
    .controller('BooksDetailsCtrl', [
        '$scope',
        'bookApi',
        'authApi',
        '$location',
        '$routeParams', function($scope,
                                 bookApi,
                                 authApi,
                                 $location,
                                 $routeParams) {


            // We can retrieve a collection from the server
            bookApi.get($routeParams, function(res) {
                $scope.book = res;
            }, function(err) {
                if (err.status === 401) {
                    $location.search('back', $location.path());
                    $location.path('/users/login')
                }

            });
        }]);
