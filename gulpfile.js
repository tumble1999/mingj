var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser'),
	path = require('path');

function buildJS() {
	return gulp.src(["src/boot/**/*.js", "src/lib/*.js", "src/bin/**/*.js"])
		//.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(terser({
			warnings: "verbose"
		}))
		.pipe(concat('mingj.min.js'))
		/*.pipe(sourcemaps.write('.', {
			includeContent: true,
			sourceRoot: function (file) {
				return path.join(path.relative(path.join(outputDir, path.dirname(file.relative)), '.'), sourceDir);
			}
		}))*/
		.pipe(gulp.dest('dist'))
}
function buildUS() {
	return gulp.src(["misc/header.user.js", "dist/mingj.min.js", "misc/footer.user.js"])
		.pipe(concat('mingj.user.js'))
		.pipe(gulp.dest('dist'))
}

gulp.task('build-js', buildJS);
gulp.task('build-us', buildUS);
gulp.task('build', gulp.series('build-js', 'build-us'));
