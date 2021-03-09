'use strict'

const
	gulp = require('gulp'),
	rename = require('rename'),
	newer = require('gulp-changed'),
	includefile = require('gulp-file-include'),
	postcss = require('gulp-postcss'),
	less = require('gulp-less'),
	less_newer = require('gulp-less-changed'),
	babel = require('gulp-babel'),
	bs = require('browser-sync').create(),
	imgmin = require('gulp-imagemin'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	ghPages = require('gulp-gh-pages'),
	svgOptions = {
		plugins: [
			{addAttributesToSVGElement: {attributes: [
				{preserveAspectRatio: 'none'},
			]}},
			{removeViewBox: false},
		],
	}

function html() {
	return gulp.src('src/html/*.html')
		.pipe(includefile())
		.pipe(gulp.dest('build'))
		.pipe(bs.stream())
}

function css() {
	return gulp.src('src/less/*.less', {sourcemaps: true})
	.pipe(less_newer({getOutputFileName: file => rename(file, {dirname: 'build/css', extname: '.css'})}))
	.pipe(less({strictMath: 'on'}))
		.pipe(postcss([
			require('postcss-inline-svg')({
				paths: ['build/img'],
			}),
			// require('postcss-svgo')(svgOptions),
			require('postcss-pseudo-class-enter'),
		],
		))
		.pipe(gulp.dest('build/css', {sourcemaps: '.'}))
		.pipe(bs.stream())
}

function js() {
	return gulp.src('src/js/*.js', {sourcemaps: true})
		.pipe(includefile())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('build/js', {sourcemaps: '.'}))
		.pipe(bs.stream())
}

function img() {
	return gulp.src('src/img/**', {since: gulp.lastRun(img)})
		.pipe(newer('build/img'))
		.pipe(imgmin([
			imgmin.gifsicle(),
			imgmin.mozjpeg(),
			imgmin.optipng(),
			imgmin.svgo(svgOptions)
		]))
		.pipe(gulp.dest('build/img'))
		.pipe(bs.stream())
}

function fnt() {
	return gulp.src('src/fnt/*', {since: gulp.lastRun(fnt)})
		.pipe(newer('build/fnt'))
		.pipe(gulp.dest('build/fnt'))
		.pipe(bs.stream())
}

function icons() {
  return gulp.src('build/img/fnt/*.svg')
	 .pipe(iconfontCss({
		fontName: 'icons',
		cssClass: 'ifnt',
		path: 'src/less/template/_iconfont-template.less',
		targetPath: '../../src/less/template/_icons.less',
		fontPath: 'build/fnt',
	 }))
	 .pipe(iconfont({
		fontName: 'icons',
		prependUnicode: true,
		formats: ['ttf', 'eot', 'woff', 'woff2'],
		timestamp: Math.round(Date.now()/1000),
		fontHeight: '1001',
		normalize: true,
	  }))
	 .pipe(gulp.dest('build/fnt'))
}

// watch
function watch_html() {
	return gulp.watch('src/html/', html)
}

function watch_css() {
	return gulp.watch('src/less', css)
}

function watch_js() {
	return gulp.watch('src/js', js)
}

function watch_img() {
	return gulp.watch('src/img', img)
}

function watch_fnt() {
	return gulp.watch('src/fnt', fnt)
}

function watch_icons() {
	return gulp.watch('build/img/fnt', icons)
}

function serve() {
	bs.init({
		server: {
			baseDir: 'build',
			directory: true,
			serveStaticOptions: {
				extensions: ['html'],
			}
		},
		// https: true,
		ghostMode: false,
		open: false,
	})
}

function deploy() {
	return gulp.src('build/**')
		.pipe(ghPages())
}

// tasks
gulp.task('default', gulp.parallel(serve, watch_html, watch_img, watch_fnt, watch_icons, watch_css, watch_js))

gulp.task('run', gulp.parallel(gulp.series(img, fnt, icons, css), html, js))

gulp.task('deploy', gulp.series(deploy))
