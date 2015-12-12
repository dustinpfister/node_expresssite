/*


  use:

  $ mongo --shell --norc mongodb.js

*/


db.userdata.findOne({'name':'jack'}).forEach(printjson);