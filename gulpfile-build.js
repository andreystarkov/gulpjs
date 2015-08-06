var gulp  = require('gulp'),
wiredep   = require('wiredep').stream,
useref    = require('gulp-useref'),
gulpif    = require('gulp-if'),
uglify    = require('gulp-uglify'),
minifyCss = require('gulp-minify-css'),
clean     = require('gulp-clean'),
gutil     = require( 'gulp-util' ),
ftp       = require( 'vinyl-ftp' );



//sftp
gulp.task( 'deploy', function() {
    var conn = ftp.create( {
        host:     '',
        user:     '',
        password: '',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
    'build/**',
    'build/css/**',
    'build/scripts/**',
    'build/index.html'
    ];

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '' ) ) // only upload newer files
        .pipe( conn.dest( '' ) );
} );


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