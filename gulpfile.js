"use strict";

var gulp     = require('gulp'),
	prefix     = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect    = require('gulp-connect'),
	sass       = require('gulp-sass'),
	wiredep    = require('wiredep').stream;


//server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});


//sass
gulp.task('sass', function () {
	gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(prefix('last 3 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});


// html
gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(connect.reload());
	})


//bower
gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
      directory : "app/components/"
    }))
    .pipe(gulp.dest('app/'));
});


// watch
gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', ['sass'])
	gulp.watch('app/*.html', ['html'])
	gulp.watch('bower.json', ['bower'])
})

// default
gulp.task('default', ['connect', 'html', 'sass', 'watch']);