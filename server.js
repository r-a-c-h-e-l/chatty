var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var User = function(obj) {
  this.person = obj;
  this.name = "anonymous";
}

var clientDB =[];
var messageDB = {
    type:"messageHistory",
    list: []
}
var userCurrent= {
  type: "friendList",
  list: []
}


server.on("connection",function(client) {
  console.log("friend connected");
  console.log(messageDB);

  var friend = new User(client);
  clientDB.push(friend);

  clientDB.forEach(function(user) {
    if (user.person != client) {
      user.person.send(JSON.stringify("a new friend has joined the chat!"));
    }
  });

  client.on("message", function(message) {
    if (friend.name === "anonymous") {
      client.send(JSON.stringify(messageDB));
      console.log(message);
      friend.name = message;
      userCurrent.list.push(message);
      console.log(userCurrent.list);
      clientDB.forEach(function(user){
        user.person.send(JSON.stringify(userCurrent));
      });
    } else {
      var receivedMessage = JSON.parse(message);
      console.log(receivedMessage);
      console.log(receivedMessage.msgType);
      receivedMessage.msgType = "messageHistory";
      console.log(receivedMessage);
      messageDB.list.push(receivedMessage);
      console.log(messageDB);
      clientDB.forEach(function(user) {
        user.person.send(message);
      });
    }
  });
});
