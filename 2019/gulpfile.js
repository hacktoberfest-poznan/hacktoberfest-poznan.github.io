const gulp = require('gulp');
sass = require('gulp-sass'),
postcss = require('gulp-postcss'),
concat = require('gulp-concat'),
htmlmin = require('gulp-htmlmin'),
tildeImporter = require('node-sass-tilde-importer'),
autoprefixer = require('autoprefixer'),
terser = require('gulp-terser'),
livereload = require('gulp-livereload'),
log = require('fancy-log');
chalk = require('chalk');
cssnano = require('cssnano'),
imagemin = require('gulp-imagemin'),
ghPages = require('gulp-gh-pages'),
del = require('del');

dest = './dist',

paths = {
	html: ['./src/index.html', './src/polish.html'],
	scss: './src/scss/**/*.scss',
	js: './src/js/**/*',
	images: './src/assets/**/*'
};

function styles() {
	const processor = [
		autoprefixer,
		cssnano
	];

	return gulp.src(paths.scss)
		.pipe(sass({
			importer: tildeImporter
		}).on('error', sass.logError))
		.pipe(postcss(processor))
		.pipe(gulp.dest(dest));
}

function scripts() {
	return gulp.src(
		[
			paths.js
		])
		.pipe(concat('bundle.min.js'))
		.pipe(terser())
		.on('error', err => {
			log(chalk.ref('[ERROR]'), err.toString());
		})
		.pipe(gulp.dest(dest + '/js'));
}

function images() {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest(dest + '/assets'));
}

function html() {
	return gulp.src(paths.html)
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
}

function copy() {
	return gulp.src([
		'./src/browserconfig.xml',
		'./src/CNAME',
		'./src/manifest.json'
	]).pipe(gulp.dest(dest));
}

function deploy() {
	const options = {
		branch: 'master'
	};

	return gulp.src('./dist/**/*')
		.pipe(ghPages(options));
}

function watch() {
	gulp.watch(paths.scss, styles);
	gulp.watch(paths.html, html);
	gulp.watch(paths.js, scripts);
}

function clean() {
	return del(['./dist']);
}

exports.default = gulp.series(clean, gulp.parallel(clean, styles, html, scripts, images, copy), watch);
exports.build = gulp.series(clean, gulp.parallel(clean, styles, html, scripts, images, copy));
exports.deploy = gulp.series(deploy);
