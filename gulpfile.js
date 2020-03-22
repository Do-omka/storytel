'use strict'

const
	gulp = require('gulp'),
	rename = require('rename'),
	newer = require('gulp-changed'),
	htmlinclude = require('gulp-file-include'),
	postcss = require('gulp-postcss'),
	less = require('gulp-less'),
	less_newer = require('gulp-less-changed'),
	babel = require('gulp-babel'),
	bs = require('browser-sync').create(),
	imgmin = require('gulp-imagemin'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
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
		.pipe(htmlinclude())
		.pipe(gulp.dest('docs'))
		.pipe(bs.stream())
}

function css() {
	return gulp.src('src/less/*.less', {sourcemaps: true})
	.pipe(less_newer({getOutputFileName: file => rename(file, {dirname: 'docs/css', extname: '.css'})}))
	.pipe(less({strictMath: 'on'}))
		.pipe(postcss([
			require('postcss-inline-svg')({
				path: 'docs/img',
			}),
			// require('postcss-svgo')(svgOptions),
			require('postcss-pseudo-class-enter'),
		],
		))
		.pipe(gulp.dest('docs/css', {sourcemaps: '.'}))
		.pipe(bs.stream())
}

function js() {
	return gulp.src('src/js/*.js', {sourcemaps: true})
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('docs/js', {sourcemaps: '.'}))
		.pipe(bs.stream())
}

function img() {
	return gulp.src('src/img/**', {since: gulp.lastRun(img)})
		.pipe(newer('docs/img'))
		.pipe(imgmin([
			imgmin.svgo(svgOptions)
			]))
		.pipe(gulp.dest('docs/img'))
}

function fnt() {
	return gulp.src('src/fnt/*', {since: gulp.lastRun(fnt)})
		.pipe(newer('docs/fnt'))
		.pipe(gulp.dest('docs/fnt'))
}

function icons() {
  return gulp.src('docs/img/fnt/*.svg')
	 .pipe(iconfontCss({
		fontName: 'icons',
		cssClass: 'ifnt',
		path: 'src/less/template/_iconfont-template.less',
		targetPath: '../../src/less/template/_icons.less',
		fontPath: 'docs/fnt',
	 }))
	 .pipe(iconfont({
		fontName: 'icons',
		prependUnicode: true,
		formats: ['ttf', 'eot', 'woff', 'woff2'],
		timestamp: Math.round(Date.now()/1000),
	  }))
	 .pipe(gulp.dest('docs/fnt'))
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
	return gulp.watch('docs/img/fnt', icons)
}

function serve() {
	bs.init({
		server: 'docs',
		ghostMode: false,
	})
}

// tasks
gulp.task('default', gulp.parallel(serve, watch_html, watch_img, watch_fnt, watch_icons, watch_css, watch_js))

gulp.task('run', gulp.parallel(html, img, fnt, icons, css, js))
