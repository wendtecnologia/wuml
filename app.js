
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , sqlite3 = require('sqlite3').verbose();

fs.exists('data/database/wuml.sqlite3', function (exists) {
  console.info('Verifying database...');
  var db = new sqlite3.Database('data/database/wuml.sqlite3');

  if (exists) {
    console.info('  Its Ok!');
  } else {
    console.info('  Does not exist! Creating database. This may take a while...');
    fs.readFile('data/sql/create.sql', 'utf8', function (error, data) {
      if (error) {
        throw error;
      }
      db.exec(data, function (error) {
        if (error) {
          throw error;
        }
        console.info('Done.');
      });
    });
  }
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
