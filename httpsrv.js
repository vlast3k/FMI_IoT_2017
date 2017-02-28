//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

  var ab2str = function(buf) {
    var bufView = new Uint8Array(buf);
    var encodedString = String.fromCharCode.apply(null, bufView);
    return encodedString;
  };

//We need a function which handles requests and send response
function handleRequest(request, response){
    request.on('data', function (data) {  console.log(ab2str(data));  });
    request.on('end', function () {   response.end('It Works!! Path Hit: ' + request.url);   });
    console.log(new Date().toLocaleTimeString() + ' - Requested: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log("Server listening on: http://" + add +":%s", PORT);
    })
});