var gulp  = require('gulp'),
wiredep   = require('wiredep').stream,
gulp      = require('gulp'),
useref    = require('gulp-useref'),
gulpif    = require('gulp-if'),
uglify    = require('gulp-uglify'),
minifyCss = require('gulp-minify-css'),
clean     = require('gulp-clean'),
sftp      = require('gulp-sftp');

//sftp
gulp.task('sftp', function () {
	return gulp.src('build/**/*')
		.pipe(sftp({
			host: '127.0.0.1',
			user: 'user',
			pass: 'password',
			remotePath: '/home/1/www/'
			}));
	});


//clean
gulp.task('clean', function () {
	return gulp.src('build/', {read: false})
		.pipe(clean());
	});

//build
gulp.task('build', ['clean'], function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('build'));
});

//bower
gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
      directory : "app/components/"
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
	gulp.watch('bower.json', ['bower']);
	})