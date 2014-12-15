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

  var friend = new User(client);
  clientDB.push(friend);

  clientDB.forEach(function(user) {
    if (user.person != client) {
      var newbie = {
        type: "freshmeat",
        message:"a friend has joined the chat!"
      }
      user.person.send(JSON.stringify(newbie));
    }
  });

  client.on("message", function(message) {
    if (friend.name === "anonymous") {
      client.send(JSON.stringify(messageDB));
      console.log(message);
      friend.name = message;
      userCurrent.list.push(message);
      console.log(userCurrent.list);
      userCurrent.type = "enter";
      console.log(userCurrent);
      clientDB.forEach(function(user){
        user.person.send(JSON.stringify(userCurrent));
      });
    } else {
      var receivedMessage = JSON.parse(message);
      receivedMessage.msgType = "messageHistory";
      messageDB.list.push(receivedMessage);
      clientDB.forEach(function(user) {
        user.person.send(message);
      });
    }
  });

  client.on("close", function() {
    var id = "";
    console.log(clientDB);
    clientDB.forEach(function(user) {
        if(user.person === client) {
          id = user.name;
          console.log(id);
          var remove = clientDB.indexOf(user);
          clientDB.splice(remove,1);
          console.log(clientDB);
        }
    });
    userCurrent.list.forEach(function(name) {
      if (name === id) {
        var exit = userCurrent.list.indexOf(name);
        userCurrent.list.splice(exit,1);
        console.log(userCurrent);
      }
    });
    clientDB.forEach(function(user){
      userCurrent.type = "exit";
      console.log(userCurrent);
      user.person.send(JSON.stringify(userCurrent));
      var deserter = {
        type: "goodbye",
        message: id + " has left the room."
      }
      user.person.send(JSON.stringify(deserter));
    });
  });
});
