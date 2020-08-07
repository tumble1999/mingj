var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser')

function build() {
	return gulp.src("src/**/*.js")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(terser({
			warnings:"verbose"
		}))
		.pipe(concat('min-gj.min.js'))
			.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
			.pipe(gulp.dest('dist'))
}

gulp.task('build', build);