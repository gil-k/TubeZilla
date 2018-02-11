// 02/10/2018

var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'videos'
});

connection.connect();

var genNewData = () => {
  var str = `(  SUBSTRING(MD5(RAND()) FROM 1 FOR 8), SUBSTRING(MD5(RAND()) FROM 1 FOR 20), SUBSTRING(MD5(RAND()) FROM 1 FOR 8), LEFT(UUID(), 8), LEFT(UUID(), 20), SUBSTRING(MD5(RAND()) FROM 1 FOR 8), LPAD(LEFT(REPLACE(REPLACE(REPLACE(TO_BASE64(UNHEX(MD5(RAND()))), "/", ""), "+", ""), "=", ""), 15), 15, 0), SUBSTRING(MD5(RAND()) FROM 1 FOR 32), SUBSTRING(MD5(RAND()) FROM 1 FOR 30), ${(Math.floor(Math.random() * 41) + 10) * 10 }, ${(Math.floor(Math.random() * 61) + 10) * 10}, SUBSTRING(MD5(RAND()) FROM 1 FOR 30), ${(Math.floor(Math.random() * 41) + 10) * 10 }, ${(Math.floor(Math.random() * 61) + 10) * 10}, SUBSTRING(MD5(RAND()) FROM 1 FOR 30), ${(Math.floor(Math.random() * 41) + 10) * 10 }, ${(Math.floor(Math.random() * 61) + 10) * 10}, SUBSTRING(MD5(RAND()) FROM 1 FOR 30), SUBSTRING(MD5(RAND()) FROM 1 FOR 30))`

  return str;
}

var init = Date.now();
var targetRandomDataSize = 10000000;
var insertBatchSize = 500;
var repeat = Math.floor(targetRandomDataSize / insertBatchSize) + 1;

// for (var j = 0; j < repeat; j++) {
for (var j = 0; j < 500; j++) {

  // for (var i = 0; i < insertBatchSize; i++) {
  for (var i = 0; i < 1000; i++) {
    connection.query(`INSERT INTO videoObj (kind, etag, videoKind, videoId, publishedAt, channelId, title, description, defaultUrl, defaultHeight, defaultWidth, mediumUrl, mediumHeight, mediumWidth, highUrl, highHeight, highWidth, channelTitle, liveBroadcastContent) VALUES ${genNewData()}`, function(err, data) {
      if (err) {
        console.log('error encountered');
      }
    })
  }
}

console.log(`Time took to insert data: ${Date.now() - init} ms`);

connection.end();


// MySQL commands that can be used to generate random data by MySQL

// LEFT(UUID(), 8),   <----- values seem to increment
// LEFT(UUID(), 8),
// LEFT(UUID(), 20)
// |  96 | d38263f6 | d382640a | d382640b-0ecf-11e8-a |
// |  97 | d38278b4 | d38278d2 | d38278d3-0ecf-11e8-a |
// |  98 | d3828c78 | d3828c8c | d3828c8d-0ecf-11e8-a |
// |  99 | d3829c86 | d3829c9a | d3829c9b-0ecf-11e8-a |
// | 100 | d382aaa0 | d382aaaa | d382aaab-0ecf-11e8-a |


// lpad(conv(floor(rand()*pow(36,8)), 10, 36), 8, 0)
// LPAD(LEFT(REPLACE(REPLACE(REPLACE(TO_BASE64(UNHEX(MD5(RAND()))), "/", ""), "+", ""), "=", ""), 10), 10, 0)
// SUBSTRING(MD5(RAND()) FROM 1 FOR 15)

// 1st one nixed numbers and capitals
// 2nd one mixes numbers, upper & lower alphabets
// 3rd one mixes numbers and only lower case letters

// |  95 | USTJ5UV1 | ohsOH3KYes | 88a1199e50ccf5c |
// |  96 | 4M6XIMT7 | QuIs97KdCa | 0f2601e13f56117 |
// |  97 | 5P96P6GO | Qm3aowFPQX | 61bfc1b92763915 |
// |  98 | 7H7TNVZI | HlTCuJPIY1 | 867489ebee13236 |
// |  99 | CBHYVV7O | M7pSAyXax2 | 1d2a6f24b686f2e |
// | 100 | RN2CL09N | shNsD6wBqW | d4ed0986fef4463 |


// lpad(conv(floor(rand()*pow(36,8)), 10, 36), 8, 0),
// LPAD(LEFT(REPLACE(REPLACE(REPLACE(TO_BASE64(UNHEX(MD5(RAND()))), "/", ""), "+", ""), "=", ""), 10), 10, 0),
// SUBSTRING(MD5(RAND()) FROM 1 FOR 15)

// 1st upper case + numbers
// 2nd alphanumeric & both cases
// 3rd lower case + numbers

// |  94 | B5RXL5Q2 | AFlrZtnki1 | 1c99e09d5dc203f |
// |  95 | J4POIKIM | XX5XFpbPqh | 9fd1cb2f6ab229a |
// |  96 | 554D2XNE | VpA2lESjzk | f224aa987dc2c62 |
// |  97 | 2UFRA0UB | LIKapr3iLi | 50f84506adf158d |
// |  98 | GSQVR9N5 | WnGvmqMhv7 | 4be4db9570ad65c |
// |  99 | 71X6RFKB | TdiRZBde3x | 8b4414a2a9f577e |
// | 100 | 2PLA6ZLF | r7HQXzsIh3 | 31f1de157c3ed12 |
