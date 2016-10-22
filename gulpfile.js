var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require ('gulp-notify');
// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });
    // Watch for changes in sass, html, js
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass()).on('error', function(err) {
            return notify().write(err);
        })
         .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
        // .pipe(notify({ message: 'Inject complete' }));
});

gulp.task('default', ['serve']);
