var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var imageMin = require('gulp-imagemin')

var browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');

gulp.task("sass", function() {
  // We want to run "sass assets/css/app.scss app.css --watch"
  return gulp.src("src/assets/css/app.scss")
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(
		cleanCss({
			compatiability: 'ie8'
		}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist"))
	.pipe(browserSync.stream())
})

gulp.task('fonts', function(){
	return gulp.src("src/assets/fonts/*")
		.pipe(gulp.dest("dist/fonts"))
})

gulp.task('images', function(){
	return gulp.src("src/assets/img/*")
		.pipe(imageMin())
		.pipe(gulp.dest("dist/img"))
})

gulp.task('html', function(){
	return gulp.src("src/index.html")
		.pipe(gulp.dest('dist'))
})

gulp.task("watch", function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
	gulp.watch('src/index.html',['html']).on('change', browserSync.reload)
	gulp.watch('src/assets/css/app.scss',['sass'])
	gulp.watch('src/assets/fonts/*',['fonts'])
	gulp.watch('src/assets/img/*',['images'])
})

gulp.task('default', ["html", "sass", "fonts", "images", "watch"]);