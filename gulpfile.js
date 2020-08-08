var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser')

function buildJS() {
	return gulp.src(["src/kernel.js", "src/**/*.js"])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(terser({
			warnings:"verbose"
		}))
		.pipe(concat('min-gj.min.js'))
			.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
			.pipe(gulp.dest('dist'))
}
function buildUS() {
	return gulp.src(["misc/header.user.js","dist/mingj.min.js","misc/footer.user.js"])
		.pipe(concat('mingj.user.js'))
		.pipe(gulp.dest('dist'))
}

gulp.task('build-js', buildJS);
gulp.task('build-us', buildUS);
gulp.task('build', gulp.series('build-js','build-us'));
