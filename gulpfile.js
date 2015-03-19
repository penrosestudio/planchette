var gulp = require('gulp'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  embedlr = require('gulp-embedlr'),
  connect = require('connect');
  debug = require('gulp-debug'),
  shell = require('gulp-shell'),
  neat = require('node-neat').includePaths;

var paths = {
    scss: './src/scss/*.scss'
};

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
  gulp.src([
    './src/javascripts/jquery-1.11.0.min.js', 
    './src/javascripts/app.js'
  ]).pipe(concat('main.js'))
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
        cons = require('consolidate'),
        Handlebars = require('handlebars'),
        express = require('express'),
        app = express(),
        port = process.env.PORT || 8000;
    
    // set app views
    app.engine('html', cons.handlebars);
    app.set('view engine', 'html');

    // set app public directory & views
    app.use(express.static(path.join(__dirname,'/build')));
    app.set('views', path.join(__dirname,'/src'));
    
    // Register partials
    var partials = path.join(__dirname,"/src/partials/");
    fs.readdirSync(partials).forEach(function (file) {
        var source = fs.readFileSync(path.join(partials, file), "utf8"),
            partial = /(.+)\.html/.exec(file).pop();
        Handlebars.registerPartial(partial, source);
    });

    // Register helpers
    var helpers = {
        "foreach": function(arr,options) {
            if(typeof arr==='string') {
                return options.fn(arr);
            }
            if(options.inverse && (!arr || !arr.length)) {
                return options.inverse(this);
            } else if(!arr) {
                return '';
            }
            return arr.map(function(item,index) {
                item.$index = index;
                item.$first = index === 0;
                item.$last  = index === arr.length-1;
                return options.fn(item);
            }).join('');
        },
        "propertyListClassFromStatus": function(status) {
            return status==="on the market" ? "onMarket" : (status==="under offer" ? "underOffer" : "propertyLet");
        },
        // from https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-strings.js
        "lowercase": function(str) {
            if(str && typeof str === "string") {
                return str.toLowerCase();
            }
        },
        // from https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-comparisons.js
        "is": function (value, test, options) {
            if (value === test) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        // from https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-comparisons.js
        "or": function (a, b, options) {
            if (a || b) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        // from https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-math.js
        "add": function (value, addition) {
            return value + addition;
        },
        "formatDate": function(datetime, formatString) {
            // mutate the date into London timezone and then format it
            return moment(datetime).tz('Europe/London').format(formatString);
        }
    };
    
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            Handlebars.registerHelper(helper, helpers[helper]);
        }
    }

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