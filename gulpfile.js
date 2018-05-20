var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	minCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify');

gulp.task('sass', function() {
	return gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
 	gulp.src('src/js/*.js')
	.pipe(browserSync.stream());
	gulp.src('src/*html')
	.pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['browser-sync']);
	gulp.watch('src/*.html', ['browser-sync']);
});

gulp.task('img', function() {
	gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'));
});

gulp.task('minify-css', function() {
    gulp.src('src/css/*.css')
    .pipe(minCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['sass', 'minify-css', 'minify-js', 'img'], function() {
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));

	gulp.src('src/fonts/*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['watch']);
