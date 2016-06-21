var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    meta = require('./package.json');

var jsDir     = 'themes/manala/static/js/',
    sassDir   = 'themes/manala/static/sass/',
    fontsDir  = 'themes/manala/static/fonts/',
    imagesDir = 'themes/manala/static/images/',
    distDir   = 'static',
    libJs     = {
        // 'xxxxx/js/xxxx.js': 'libs.js'
    },
    libCss    = {
        // 'xxxxx/css/xxxx.css': 'libs.css'
    };


var onError = function (err) {
    $.util.beep();
    console.log(err.toString());
    this.emit('end');
};

gulp.task('fonts', function() {
    return gulp.src(fontsDir + '**/*')
        .pipe(gulp.dest(distDir + "/fonts"));
});

gulp.task('images', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(gulp.dest(distDir + "/images"));
});

gulp.task('sass-dev', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(distDir + "/css"));
});
gulp.task('sass-prod', function() {
    return gulp.src(sassDir + '*.scss')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.cleanCss())
        .pipe(gulp.dest(distDir + "/css"));
});

gulp.task('lib-css', function() {
    for (var src in libCss) {
        gulp.src(src)
            .pipe($.concat(libCss[src]))
            .pipe(gulp.dest(distDir + "/css"));
    }
});

gulp.task('lib-js', function() {
    for (var src in libJs) {
        gulp.src(src)
            .pipe($.concat(libJs[src]))
            .pipe(gulp.dest(distDir + "/js"));
    }
});

gulp.task('scripts-dev', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"));
});
gulp.task('scripts-prod', function() {
    return gulp.src([jsDir + '*.js'])
        .pipe(gulp.dest(distDir + "/js"))
        .pipe($.uglify())
        .pipe(gulp.dest(distDir + "/js"));
});


gulp.task('clean', function() {
    return gulp.src(distDir, {read: false})
        .pipe($.clean());
});

gulp.task('default', ['sass-prod', 'scripts-prod', 'lib-css', 'lib-js', 'fonts', 'images'], function() {
    gulp.watch(jsDir + '**/*.js', ['scripts-prod']);
    gulp.watch(sassDir + '**/*.scss', ['sass-prod']);
});

gulp.task('dev', ['sass-dev', 'scripts-dev', 'lib-css', 'lib-js', 'fonts', 'images'], function() {
    gulp.watch(jsDir + '**/*.js', ['scripts-dev']);
    gulp.watch(sassDir + '**/*.scss', ['sass-dev']);
});

gulp.task('install', ['sass-prod', 'scripts-prod', 'lib-css', 'lib-js', 'fonts', 'images'], function(){});
