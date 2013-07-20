
/*
 * GET configs.
 */

exports.checkDb = function (){
  var fs = require('fs')
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
};