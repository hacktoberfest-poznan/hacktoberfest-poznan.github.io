var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    watch = require('gulp-watch'),
    tildeImporter = require('node-sass-tilde-importer'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin'),

    dest = "./dist",

    paths = {
        html: "./src/index.html",
        scss: "./src/scss/**/*.scss",
        js: "./src/js/**/*",
        images: "./src/assets/**/*"
    };

gulp.task('styles', function () {
    var processor = [
        autoprefixer,
        cssnano
    ];

    gulp.src(paths.scss)
        .pipe(sass({
            importer: tildeImporter
        }).on('error', sass.logError))
        .pipe(postcss(processor))
        .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
    return gulp.src(
        [
            paths.js
        ])
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest(dest + '/js'));
});

gulp.task('imagemin', function () {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(dest + '/assets'))
});

gulp.task('minify', function () {
    return gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
});

gulp.task('copy', function () {
    return gulp.src([
        './src/browserconfig.xml',
        './src/CNAME',
        './src/manifest.json'
    ]).pipe(gulp.dest(dest));
});

gulp.task('default', ['styles', 'minify', 'scripts', 'imagemin', 'copy'], function () {
    gulp.watch([paths.scss, paths.html, paths.js], ['styles', 'minify', 'scripts']);
});

gulp.task('build', ['styles', 'minify', 'scripts', 'imagemin', 'copy']);