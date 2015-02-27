'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var node_static = require('node-static');


//Build tasks
gulp.task('main', function(){
  return browserify({entries: './index.js'})
    .bundle()
    .pipe(source('sphinx.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lib', function(){
  return gulp.src('./lib/*.js')
    .pipe(gulp.dest('dist/worker/'));
});

gulp.task('workers', function(){
  return gulp.src('./src/worker/*.js')
    .pipe(gulp.dest('dist/worker/'));
});

gulp.task('build', ['main', 'lib', 'workers']);


//Example Tasks
gulp.task('example', ['build'], function(){
  return gulp.src('dist/**/*.js')
    .pipe(gulp.dest('example/sphinx'));
});
gulp.task('example-server', function(){
  var server = new node_static.Server('./example');

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(9000);
});


gulp.task('default', ['build']);
