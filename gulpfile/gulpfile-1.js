"use strict";

var gulp     = require('gulp'),
	concatCSS  = require('gulp-concat-css'),
	rename     = require('gulp-rename'),
	notify     = require('gulp-notify'),
	prefix     = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect    = require('gulp-connect'),
	sass       = require('gulp-sass'),
	uncss      = require('gulp-uncss'),
	minifyCSS  = require('gulp-minify-css');


//server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});


//sass in css
gulp.task('sass', function () {
	gulp.src('app/sass/style.sass')
		//.pipe(concatCSS('bundle.css'))
		.pipe(sass())
		.pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('app/css'))
		/*.pipe(notify('well Done!'));*/
		.pipe(connect.reload());
});


//css
gulp.task('css', function() {
	return gulp.src('app/css/style.min.css')
		.pipe(uncss({
			html: ['app/index.html']
		}))
		.pipe(gulp.dest('app/build'));
});


//html
gulp.task('html', function (){
	gulp.src('app/*')
	gulp.src('app/sass/style.sass')
	.pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', ['sass'])
	gulp.watch('app/*.html', ['html'])
});

//default
gulp.task('default', ['connect', 'html', 'sass', 'css', 'watch']);