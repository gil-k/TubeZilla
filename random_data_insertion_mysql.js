var mysql = require('mysql');
var faker = require('faker');

var connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'videos'
});
connection.connect();


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var startIndex = 0;// ~ 9500019;

var insertionSize = 5000;

for (var repeat = 0; repeat < 100; repeat++) {

  var queryString = 'insert into video values ';


  for (var i = 1 ; i <= insertionSize; i++) {
    let index = repeat * insertionSize + i + startIndex;
    console.log(index);
    queryString += '(' + index;
    queryString += ',"' + faker.lorem.words() + '"';
    queryString += ',"' + faker.lorem.sentence() + '"';

    if (faker.random.boolean()) {
      queryString += ',' + 1;
    } else {
      queryString += ',' + 0;
    }

    queryString += ',"' + makeid(7) + '"';
    queryString += ',"' + makeid(7) + '"';
    // queryString += ',' + faker.date.past() + ')';
    queryString += ',"Mon Feb 05 2018 15:52:11 GMT-0800 (PST)"';
    queryString += ',"Mon Feb 05 2018 15:52:11 GMT-0800 (PST)"';

    queryString += ',"' + faker.image.image() + '"';
    queryString += ',"' + faker.image.image() + '"';

    let videoLength = Math.floor( Math.random() * (4 * 60 * 60) ) + 600;
    queryString += ',' + videoLength + ')';

    if (i === insertionSize) {
      queryString += ';';
    } else {
      queryString += ',';
    }
  }

  connection.query(queryString, '', function(err, results) {
    if (err) {
      console.log('Error while performing insertion query.');
    }
  });
}

connection.end();

module.exports = connection;

