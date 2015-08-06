"use strict";

var gulp     = require('gulp'),
	concatCSS  = require('gulp-concat-css'),
	minifyCSS  = require('gulp-minify-css'),
	prefix     = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect    = require('gulp-connect'),
	sass       = require('gulp-sass'),
	uncss      = require('gulp-uncss'),
	rename     = require('gulp-rename');


var source = "app/",
	build    = "dist/";

var
css = {
	in:source + "css/*.css",
	out:build + "css/"
}


//server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

//css [concat, prefix, minify]
gulp.task('css', function () {
	gulp.src('app/css/*.css')
		.pipe(concatCSS('bundle.css'))
		.pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
		.pipe(minifyCSS())
		.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});

//sass
gulp.task('sass', function () {
	gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
		.pipe(minifyCSS(''))
		.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});

//uncss
gulp.task('uncss', function () {
	gulp.src('app/css/style.css')
		.pipe(uncss({
			html: ['app/index.html']
			}))
		.pipe(gulp.dest('app/css/uncss'));
});

// html
gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(connect.reload());
	})

// watch
gulp.task('watch', function () {
	//gulp.watch('app/css/*.css', ['css'])
	gulp.watch('app/sass/*.sass', ['sass'])
	gulp.watch('app/*.html', ['html'])
})

// default
gulp.task('default', ['connect', 'html', 'sass', 'watch']);