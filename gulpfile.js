var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/*.sass", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./sass/main.sass")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);


// DEPLOYMENT
