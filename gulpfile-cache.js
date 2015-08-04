"use strict";

var gulp          = require('gulp'),
	sass            = require('gulp-sass'),
	rev             = require('gulp-rev'),
	revcollector    = require('gulp-rev-collector'),
	gutil           = require('gulp-util'),
	rimraf          = require('rimraf'),
	revOutdated     = require('gulp-rev-outdated'),
	path            = require('path'),
	through         = require('through2'),
	runSequence     = require('run-sequence');





//sass
gulp.task('sass', function () {
	gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css/'))
});

gulp.task('rev', function () {
	gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(rev())
		.pipe(gulp.dest('app/css/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('app/manifests/'));
	});

gulp.task('revcollector', ['rev'], function () {
	return gulp.src(['app/manifests/*.json', 'app/index.html'])
		.pipe(revcollector({
				replaceReved: true
			}) )
		.pipe(gulp.dest('app/'));
	});

function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('clean', ['revcollector'], function() {
    gulp.src( ['app/**/*.*'], {read: false})
        .pipe( revOutdated(3) ) // leave 1 latest asset file for every file name prefix.
        .pipe( cleaner() );
    return;
});

gulp.task('build', function(callback) {
  runSequence('rev',
              ['revcollector', 'clean'],
              callback);
});

