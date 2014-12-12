var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var User = function(obj) {
  this.client = obj;
  this.name = "anonymous";
  // this.msg = obj.msg;
}

var clientDB =[];
var messageDB =[];

server.on("connection", function(client) {
  console.log("friend connected");
  var friend = new User(client);

})
