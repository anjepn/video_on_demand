/// <reference path=".././../../typings/index.d.ts" />
'use strict';

angular.module('vodadminApp').controller('MoviesController', ['UserService', 'MoviesService','FileUploadService','$scope','$location','$http',
function (userService, moviesService,fileUploadService,$scope, $location, $http) {
    self = this;
    self.partial;
    self.user = userService.user;
    self.allGenres = [];
    var _id = 1;
    moviesService.getGenres().then(function (response) {
        angular.forEach(response.data, function(genre){
            self.allGenres.push({
                id: _id++,
                label: genre
            });
        });
    },function(error){

    });

    if (self.user == null)
        $location.path("/");

    self.getAllMovies = function () {
        console.log('here');
        moviesService.getAllMovies().then(function (response) {
            self.response = response.data;
            self.partial = 'get-all-movies';
        }, function (error) {
            self.partial = 'get-all-movies';
            console.log(error.data.message);
        });
    };
    self.postMovie = function () {
        var g = self.newMovie.genre;
        var l = g.label;
        self.newMovie.genre = l;
        self.newMovie.cast = [];
        moviesService.postMovie(self.newMovie).then(function (response) {
            self.partial = 'post-a-movie';
            self.response = response.data;
            self.newMovie = {};
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.deleteAllMovies = function () {
        moviesService.deleteAllMovies().then(function (response) {
            self.partial = 'delete';
            self.response = response.data;
        }, function (error) {
             self.partial = 'delete';
            self.response = response.data;
            console.log(error);
        });
    };
    self.getMoviebyId = function () {
        moviesService.getMoviebyId(self.movieId).then(function (response) {
            self.partial = 'get-movie-by-id';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.deleteMovieybyId = function () {
        moviesService.deleteMovieybyId(self.movieId).then(function (response) {
            self.partial = 'delete';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.getAllMovieComments = function () {
        moviesService.getAllMovieComments(self.movieId).then(function (response) {
            self.partial = 'get-movie-comments';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.deleteAllMovieComments = function () {
        moviesService.deleteAllMovieComments(self.movieId).then(function (response) {
            self.partial = 'delete';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.getCommentbyId = function () {
        moviesService.getCommentbyId(self.movieId, self.commentId).then(function (response) {
            self.partial = 'get-movie-comment-by-id';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.deleteCommentbyId = function () {
        moviesService.deleteCommentbyId(self.movieId, self.commentId).then(function (response) {
            self.partial = 'delete';
            self.response = response.data;
        }, function (error) {
            console.log(error.data.message);
        });
    };
    self.getCoverImage = function (movie) {
        return moviesService.serveCoverImage(movie.id);
    };
    self.playMovie = function (movie) {
        self.playsrc = moviesService.serveVideoFile(movie.id);
    };
    self.stopPlayback = function (){
        $('#playerModal').hide();
        $('#playerModal video').attr("src", "null");
    };
    // upload on file select or drop
    $scope.submit = function() {
      console.log('upload clicked');
      if ($scope.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };
    $scope.upload = function (file) {
        fileUploadService.uploadFile(file).when(function(response){
        }, function(error){
        });
    }
}]);