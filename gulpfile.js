var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser'),
	emcc = require('gulp-emscripten'),
	filter = require('gulp-filter'),
	replace = require('gulp-replace');

	
var siteurl = "https://tumble1999.github.io/mingj/";

function buildCPP() {
	//return gulp.src(["cpp/**/*.c","cpp/**/*.h","cpp/**/*.cpp","cpp/**/*.hpp"])
	var filterJs = filter(["*.js"], {restore: true});

	return gulp.src("cpp/mingj.cpp")
		.pipe(emcc(["--no-entry","--bind","-std=c++1z","-s WASM=1"]))
		.pipe(filterJs)
		.pipe(gulp.dest('src'))
		.pipe(filterJs.restore)
		.pipe(filter(["*.wasm"]))
		.pipe(gulp.dest('dist'))
}
function buildJS() {
	return gulp.src(["src/mingj.js","src/boot/**/*.js", "src/lib/*.js", "src/bin/**/*.js"],{ sourcemaps: true })
		.pipe(plumber())
		.pipe(terser({
			warnings: "verbose"
		}))
		.pipe(concat('mingj.min.js'))
		.pipe(gulp.dest('dist',{ sourcemaps: '.' }))
}
function buildUS() {
	return gulp.src(["misc/header.user.js", "dist/mingj.min.js", "misc/footer.user.js"])
		.pipe(concat('mingj.user.js'))
		.pipe(gulp.dest('dist'))
}

function distWasmPath() {
	return gulp.src(['dist/mingj.min.js','dist/mingj.user.js'])
	.pipe(replace('mingj.wasm',siteurl+"dist/mingj.wasm"))
	.pipe(gulp.dest('dist'));
}

gulp.task("build-cpp",buildCPP);
gulp.task('build-js', buildJS);
gulp.task('build-us', buildUS);
gulp.task('build-dist', distWasmPath);
gulp.task('build', gulp.series('build-cpp','build-js', 'build-us'));
gulp.task('build-full', gulp.series('build','build-dist'));
