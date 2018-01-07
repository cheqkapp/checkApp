const gulp = require('gulp');
const fs = require('fs');
const gulpNgConfig = require('gulp-ng-config');
const rename = require('gulp-rename');
const connect = require('gulp-connect-multi')();
const $ = require('gulp-load-plugins')();
const config = require('./gulp.config.js');
const path = require('path');
const gulpCopy = require('gulp-copy');
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const karma = require('karma').Server;
const gutil = require('gulp-util');
const _ = require('lodash');
const run = require('run-sequence');
const rev = require('gulp-rev');
const replaceInFile = require('replace-in-file');


// delete build folder
gulp.task('clean', function(done) {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

gulp.task('jshint', function() {
    return gulp.src(['src/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


//Implement Environments later
/*gulp.task('appEnvConfig',function(){
    var environment = 'env.local';

    if(_.includes(process.argv,'--prod')) {
        environment = 'env.prod';
    }else if(_.includes(process.argv,'--qa')){
        environment = 'env.qa';
    }else if(_.includes(process.argv,'--uat')){
        environment = 'env.uat';
    }else if(_.includes(process.argv,'--dev')){
        environment = 'env.dev';
    }else if(_.includes(process.argv,'--sandbox')){
        environment = 'env.sandbox';
    }

    gulp.src(config.parent + "config/app/src/app-config/app.config.json")
        .pipe(gulpNgConfig('app.config',{environment: environment}))
        .pipe(gulp.dest(config.dist + '/src/app'))

});

gulp.task('appEnvConfigJenkinsBuild',function(){
    var environments = ['env.dev','env.qa','env.uat','env.prod'];
    _.each(environments, function(env){
        var prefix = env.split(".").pop();
        console.log(prefix + '_app.config');
        gulp.src(config.parent + "config/app/src/app-config/app.config.json")
            .pipe(gulpNgConfig('app.config',{environment: env}))
            .pipe(rename(prefix + '_app.config.js'))
            .pipe(gulp.dest(config.dist + '/properties'))
    });


});*/

gulp.task('tests', function(done) {
    var server =  new karma({
        configFile: require('path').resolve('karma.jenkins.conf.js'),
        singleRun: true
    });
    server.on('browser_error', function (browser, err){
        gutil.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results){
        if (results.failed) {
            throw new Error('Karma: Tests Failed');
        }
        gutil.log('Karma Run Complete: No Failures');
        done();
    });

    server.start();
});

// reload all Browsers
gulp.task('reload', function() {
    gulp
        .src(config.src + '/index.html')
        .pipe(connect.reload());
});

// optimize images
gulp.task('images', function() {
    return gulp
        .src([config.src + '/images/**/*'])
        .pipe($.imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.dist + '/images'))
        .pipe($.size({title: 'images'}));
});

//Add Fonts and SASS later

// gulp.task('copy:fonts',function(){
//     return gulp
//         .src([config.src + '/css/custom/fonts/font-awesome/**/*', config.src + '/css/custom/fonts/rac-icons/**/*'])
//         .pipe(gulp.dest(config.dist + '/css/fonts'))
//         .pipe(connect.reload());
// });
//
// gulp.task('sass', function() {
//     return gulp
//         .src(config.src + '/css/main.scss')
//         .pipe($.sass({
//             outputStyle: 'expanded'
//         }).on('error', $.sass.logError))
//         .pipe(gulp.dest(config.dist + '/css'))
//         .pipe($.size({title: 'sass'}))
//         .pipe(connect.reload());
// });

gulp.task('copy:css',function(){
    return gulp
        .src([ config.src + "/css/**/*" ])
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('copy:pdfs',function(){
    return gulp
        .src([ config.src + "/pdfs/**/*" ])
        .pipe(gulp.dest(config.dist + '/pdfs'))
        .pipe(connect.reload());
});

gulp.task('copy:scripts',function(){
    return gulp
        .src([ config.src + "/app/**/*" ])
        .pipe(gulp.dest(config.dist + '/app'))
        .pipe(connect.reload());
});




gulp.task('copy:lib',function(){
    return gulp
        .src([ config.src + "/libs/**/*" ])
        .pipe(gulp.dest(config.dist + '/libs'))
        .pipe(connect.reload());
});


gulp.task('copy:root', function() {
    gulp
        .src([
            config.src + '/index.html',
            config.src + '/favicon.ico'
        ], {
            dot: true
        })
        .pipe(gulp.dest(config.dist))
        .pipe($.size({title: 'copy'}))
        .pipe(connect.reload());
});


gulp.task('revision',function(){
    return gulp.src([config.dist + '/css/*.css', config.dist + '/src/libs/**/*.js',config.dist + "/src/app/**/*.html", config.dist + "/src/app/**/*.js"], {base: config.dist})
        .pipe(rev())
        .pipe(gulp.dest(config.dist))  // write rev'd assets to build dir
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.dist))  // write manifest to build dir
});

gulp.task("revisionReplace",['revision'], function(){
    var manifest = require(config.dist + "/rev-manifest.json");
    var keys =_.keys(manifest);
    var values = _.map(keys, function(key) { return manifest[key];});

    const options = {
        files: [config.dist + '/**/*.html'],
        from: keys,
        to: values
    };

    try {
        const changes = replaceInFile.sync(options);
        console.log('Modified files:', changes.join(', '));
    }
    catch (error) {
        console.error('Error occurred:', error);
    }

});


//build without tests locally and with all projects
gulp.task('localBuild',['clean'],function(done){
    run(['images','copy:css', 'copy:pdfs','copy:root','copy:lib','copy:scripts'],function(){
        //gulp.run('revisionReplace');
        done();
    });
});

//Build for jenkins
gulp.task('build',['clean'],function(done) {
    run(['images','copy:css', 'copy:pdfs','copy:root','copy:lib','copy:scripts'],function(){
        //gulp.run('revisionReplace');
        //gulp.run('tests');
        done();
    });
});

//start local server and view application in chrome
gulp.task('server',['connect'] ,function(done) {
    gulp.watch('src/**/*.html',function(){
        run(['images','copy:root','copy:lib','copy:scripts'],function(){
            done();
        });
    });

    gulp.watch(config.src + '/app/**/*.js',function(){
        run(['copy:scripts'],function(){
            done();
        });
    });

    gulp.watch(['src/app/**/*.js'],['jshint']);
});

gulp.task('connect',['localBuild'], connect.server({
        name: 'dist server',
        port: 8000,
        root: ['dist'],
        livereload: true,
        fallback: 'index.html',
        open: {
            browser: 'chrome'
        }
    })
);
