var jsforce = require('jsforce');
var jwtflow = require('./jwt');
var fs = require('fs');

var clientId = '3MVG9KsVczVNcM8yjOAKRP7DgVRORy3HxxQUO994DmnFt41u4yEyLfi4yRtC5ORT_oSl2OIVA6o5Oi3UmCHEY'; // This is the connected app consumerKey
var privateKey = fs.readFileSync('/Users/kamlesh.patel/demos/cert/server.key', 'utf8');
var instanceUrl = 'https://na85.salesforce.com'
var username = 'connectedapp@gmail.com';

jwtflow.getToken(clientId, privateKey, username, function (err, jwtdata) {
  // err
  console.debug("jwtdata=" + JSON.stringify(jwtdata));

  var conn = new jsforce.Connection();

  conn.initialize({
    instanceUrl: jwtdata.instance_url,
    accessToken: jwtdata.access_token
  });

  conn.query('SELECT Id, Name FROM Account', function (err, res) {
    if (err) {
      console.debug("Test error=" + JSON.stringify(err));
    }

    console.debug("Test res=" + JSON.stringify(res));

  });

  console.debug("Test complete");

});