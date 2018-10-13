const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const watch = require('gulp-watch');
const tildeImporter = require('node-sass-tilde-importer');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const gutil = require('gulp-util');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const ghPages = require('gulp-gh-pages');

    dest = "./dist",

    paths = {
        html: "./src/index.html",
        scss: "./src/scss/**/*.scss",
        js: "./src/js/**/*",
        images: "./src/assets/**/*"
    };

gulp.task('styles', function () {
    const processor = [
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
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
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

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['build'],  function () {
    const options = {
        branch: 'master'
    };
    return gulp.src('./dist/**/*')
        .pipe(ghPages(options));
});

gulp.task('default', ['styles', 'minify', 'scripts', 'imagemin', 'copy'], function () {
    gulp.watch([paths.scss, paths.html, paths.js], ['styles', 'minify', 'scripts']);
});

gulp.task('build', ['styles', 'minify', 'scripts', 'imagemin', 'copy']);
