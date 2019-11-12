const syntax = 'scss'; // Syntax: sass or scss;
const srcDir = './src/';
const destDir = './dest/';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	imagemin = require('gulp-imagemin'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream');
	babel = require('gulp-babel');

sass.compiler = require('node-sass');

function sync(){
	browserSync({
		server: {
			baseDir: './dest'
		},
		notify: true,
		open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	});
}

function styles(){
	return gulp.src([
		srcDir + syntax + '/**/*.' + syntax + '',
	])
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat('style.css'))
	.pipe(rename({ suffix: '', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest(destDir + 'css'));
}

function scripts(){
	return gulp.src([
		//srcDir + 'js/jquery-3.3.1.min.js',
		'node_modules/babel-polyfill/dist/polyfill.js',
		srcDir + 'js/scripts.js', // Always at the end
	])
	.pipe(webpackStream({
		output: {
			//filename: 'app.js',
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
		],
		externals: {
			//jquery: 'jQuery'
		}
	}))
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest(destDir + 'js'));
}

function reload(done){
	browserSync.reload();
	return done();
}

function images(){
	return gulp.src('./src/img/example/*')
	.pipe(imagemin([
		imageminJpegRecompress({
        progressive: true,
        max: 10,
        min: 5
     })
	]))
	.pipe(gulp.dest('./build/img'));
}

function html(){
	return gulp.src('./*.html');
}

function watcher(){
	gulp.watch(srcDir + syntax + '/**/*.' + syntax + '', gulp.parallel(styles, reload));
	gulp.watch([srcDir + 'js/scripts.js'], gulp.parallel(scripts, reload));
	gulp.watch(destDir + '**/*.html', gulp.parallel(html, reload));
}


exports.styles = gulp.parallel(styles);
exports.scripts = gulp.parallel(scripts);
exports.images = gulp.parallel(images);
exports.default = gulp.parallel(styles, scripts, sync, watcher);

