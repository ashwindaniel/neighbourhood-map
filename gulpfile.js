var gulp = require('gulp');
var gulputil = require('gulp-util');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('jshint', function () {
    console.log("Start linting");
    var js = gulp.src('Source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    console.log("End linting");
    return js;
});

gulp.task('jscopy', function () {
    console.log("Start copying javascripts");
    var js = gulp.src('Source/js/*.js')
        .pipe(concat('app.js'))
        .pipe(minify({
            // ext: {
            //     src: '-src.js',
            //     min: '-min.js'
            // },
            mangle: false,
            compress: {
                drop_console: true, //drop console.logs
                unused: true //drop unused variables
            }
        }))
        .pipe(gulp.dest('Source/js/min'))
        .pipe(gulp.dest('bin/js'))
        .pipe(browserSync.stream());
    console.log("End copying javascripts");
    return js;
});


// gulp.task('sass', function () {
//     console.log("Converting scss to css");
//     var css = gulp.src('Source/scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('Source/css'));
//     // .pipe(browserSync.stream());
//     console.log("Conversion complete");
//     return css;
// });

gulp.task('csscopy', function () {
    console.log("Copying css start");
    var css = gulp.src('Source/css/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('Source/css/min'));
    css = gulp.src('Source/css/min/styles.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('bin/css'))
    // .pipe(browserSync.stream());
    console.log("Copying css end");
    return css;
});


gulp.task('watching', function () {

    gulp.watch('bin/**/*').on('change', browserSync.reload);

    gulp.watch('Source/js/**/*.js', ['jshint', 'jscopy']);

    gulp.watch('Source/css/*.css', ['csscopy']);

    // gulp.watch('Source/scss/*.scss', ['sass', 'csscopy']);

    gulp.watch('Source/index.html', function () {
        console.log("Index.html updated");
        gulp.src('Source/index.html')
            .pipe(gulp.dest('bin'));
    });

    // gulp.watch('Source/js/dependencies/**/*', function () {
    //     console.log("JS Dependencies updated");
    //     gulp.src('Source/js/dependencies/**/*')
    //         .pipe(gulp.dest('bin/js/dependencies'));
    // });

    // gulp.watch('Source/css/dependencies/**/*', function () {
    //     console.log("CSS Dependencies updated");
    //     gulp.src('Source/css/dependencies/**/*')
    //         .pipe(gulp.dest('bin/css/dependencies'));
    // });

    gulp.watch('Source/img/**/*', function () {
        console.log("Images folder updated");
        gulp.src('Source/img/**/*')
            .pipe(gulp.dest('bin/img'));
    });

    // gulp.watch('Source/pages/**/*', function () {
    //     console.log("HTML Pages updated");
    //     gulp.src('Source/pages/**/*')
    //         .pipe(gulp.dest('bin/pages'));
    // });

    // gulp.watch('Source/media/**/*', function () {
    //     console.log("Media updated");
    //     gulp.src('Source/media/**/*')
    //         .pipe(gulp.dest('bin/media'));
    // });


});

gulp.task('build', ['jscopy', 'csscopy'], function () {
    console.log("Init Browser-sync");
    browserSync.init({
        server: "./bin"
        // directory: true
    });

    console.log("Starting initial setup");

    gulp.src('Source/index.html')
        .pipe(gulp.dest('bin'));

    // gulp.src('Source/js/dependencies/**/*')
    //     .pipe(gulp.dest('bin/js/dependencies'));

    gulp.src('Source/css/min')
        .pipe(gulp.dest('bin/css'));

    gulp.src('Source/img/**/*')
        .pipe(gulp.dest('bin/img'));

    // gulp.src('Source/pages/**/*')
    //     .pipe(gulp.dest('bin/pages'));

    // gulp.src('Source/media/**/*')
    //     .pipe(gulp.dest('bin/media'));

    console.log("Initial setup completed");
});

gulp.task('default', ['build', 'watching'], function () { });