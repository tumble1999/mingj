var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser'),
	emcc = require('gulp-emscripten'),
	filter = require('gulp-filter')

	
var siteurl = "https://tumble1999.github.io/mingj/";

var runtime_exports = [
	"setValue",
	"cwrap",
	"ccall"
]

function buildCPP() {
	var filterJs = filter(["*.js"], {restore: true});

	return gulp.src("cpp/mingj.cpp")
		.pipe(emcc(["--no-entry","--bind","-std=c++11","-s WASM=1","-s EXTRA_EXPORTED_RUNTIME_METHODS=['" + runtime_exports.join("','") + "']"]))
		.pipe(filterJs)
		.pipe(gulp.dest('js'))
		.pipe(filterJs.restore)
		.pipe(filter(["*.wasm"]))
		.pipe(gulp.dest('dist'))
}
function buildJS() {
	return gulp.src(["js/module_init.js","js/mingj.js","js/boot/**/*.js", "js/lib/*.js", "js/bin/**/*.js"])
		.pipe(plumber())
		.pipe(terser({
			warnings: "verbose"
		}))
		.pipe(concat('mingj.min.js'))
		.pipe(gulp.dest('dist'))
}
function buildUS() {
	return gulp.src(["js/header.user.js", "dist/mingj.min.js", "js/footer.user.js"])
		.pipe(concat('mingj.user.js'))
		.pipe(gulp.dest('dist'))
}

gulp.task("build-cpp",buildCPP);
gulp.task('build-js', buildJS);
gulp.task('build-us', buildUS);
gulp.task('build', gulp.series('build-cpp','build-js', 'build-us'));
