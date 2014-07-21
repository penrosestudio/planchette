var gulp = require('gulp'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  embedlr = require('gulp-embedlr'),
  connect = require('connect');

gulp.task('clean', function(){
  return gulp.src(['build/*'], {read:false})
    .pipe(clean());
});

gulp.task('styles', function() {
  gulp.src('./src/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('images', function() {
  gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./build/images'));

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function() {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('javascripts', function() {
  gulp.src(['./src/javascripts/jquery-1.11.0.min.js', './src/javascripts/bootstrap.min.js', './src/javascripts/app.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/javascripts'));
});

gulp.task('templates', function() {
  gulp.src('./src/*.html')

    // Embed livereload snippet
    .pipe(embedlr())

    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'javascripts', 'images', 'fonts', 'templates');
});

gulp.task('watch', ['default', 'server'], function() {
  gulp.watch('./src/scss/**/*.scss', ['styles']);
  gulp.watch('./src/javascripts/**/*.*', ['javascripts']);
  gulp.watch('./src/images/**/*.*', ['images']);
  gulp.watch('./src/fonts/**/*.*', ['fonts']);
  gulp.watch('./src/*.html', ['templates']);

  var server = livereload();
  gulp.watch('build/**').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('server', function(next) {
    var fs = require('fs'),
        path = require('path'),
        app = express(),
        port = process.env.PORT || 8000;

    // set app public directory & views
    app.use(express.static(path.join(__dirname,'/build')));
    app.set('views', path.join(__dirname,'/src'));

    app.get('/pattern-book', function(req, res) {
        fs.readFile('./src/pattern-book-data.json', function(err, data) {
            try {
                data = JSON.parse(data);
                res.render('pattern-book', data);
            } catch(ex) {
                console.log(ex);
                res.send('uh-oh! error parsing the JSON file, check your console');
            }
        });
    });
    app.listen(process.env.PORT || 8000, next);
    console.log('listening on '+port+', why not visit /pattern-book');
});