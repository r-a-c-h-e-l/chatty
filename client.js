var client = new WebSocket("ws://rachel@princesspeach.nyc:3000");

var Client = function( ) {
  this.name = "";
  this.message= "";
  this.msgType= "";
}
var person = new Client();
var greeting= "connected!";
var usersCurrent= [];

client.addEventListener("open", function(evt) {
  console.log("you are connected!");
  introPage();
});

client.addEventListener("message", function(evt) {
  console.log(evt.data);
  var processedMessage = JSON.parse(evt.data);
  console.log(processedMessage);
  if (processedMessage.type === "enter") {
      var serverList = processedMessage.list;
      console.log(serverList);
      var grabSidebar = document.getElementById("sidebar");
      var grabUserList = document.getElementById("friendList");
      grabSidebar.removeChild(grabUserList);
      var uListF2 =createFriendList(serverList);
      grabSidebar.appendChild(uListF2);
  }else
    if (processedMessage.type === "exit") {
      var serverList = processedMessage.list;
      console.log(serverList);
      var grabSidebar = document.getElementById("sidebar");
      var grabUserList = document.getElementById("friendList");
      grabSidebar.removeChild(grabUserList);
      var uListF2 =createFriendList(serverList);
      grabSidebar.appendChild(uListF2);
  }else
    if (processedMessage.type === "freshmeat"){
      var li = document.createElement("li");
      li.innerText= processedMessage.message;
      li.style.listStyle = "none";
      li.style.fontSize="19px";
      li.style.color= "rgba(52,213,201,.9)";
      var uL = document.getElementById("chatList");
      uL.appendChild(li);
    } else
       if (processedMessage.type === "goodbye"){
         var li = document.createElement("li");
         li.innerText= processedMessage.message;
         li.style.listStyle = "none";
         li.style.fontSize="19px";
         li.style.color= "rgba(52,213,201,.9)";
         var uL = document.getElementById("chatList");
         uL.appendChild(li);
    } else
       if (processedMessage.type === "messageHistory") {
        console.log(processedMessage);
        console.log(processedMessage.list);
        var history = processedMessage.list;
        history.forEach(function(oldMessage) {
          var li = document.createElement("li");
          li.innerText= oldMessage.name + ": " + oldMessage.message;
          li.style.listStyle = "none";
          li.style.fontSize= "19px";
          var uL = document.getElementById("chatList");
          uL.appendChild(li)
        });
      } else {
        var li = document.createElement("li");
        li.innerText= processedMessage.name + ": " + processedMessage.message;
        li.style.listStyle = "none";
        li.style.fontSize="19px";
        var uL = document.getElementById("chatList");
        uL.appendChild(li);
      }
});









var introPage = function() {

  var body = document.querySelector("body");
  var bigDiv = document.createElement("div");
  bigDiv.id="bigDiv";
  body.style.textAlign= "center";
  body.style.position= "relative";

  var intro = document.createElement("header");
  var welcome = document.createElement("h1");
  welcome.innerText= "CHATTY";
  intro.style.backgroundColor= "rgba(75,0,130,.5)";
  intro.style.textAlign= "center";
  intro.style.color="white";
  intro.style.fontFamily="helvetica";
  intro.appendChild(welcome);

  var div1 = document.createElement("div");
  var inputName = document.createElement("input");
  inputName.id = "firstInput";
  div1.style.position="relative";
  div1.style.margin="0 auto";
  div1.style.padding="50px";
  inputName.setAttribute("type","text");
  inputName.setAttribute("placeholder","username");
  inputName.style.border="solid silver 1px";
  inputName.style.borderRadius="8px";
  inputName.style.padding="10px";
  inputName.style.fontSize="16px";
  div1.appendChild(inputName);

  var div = document.createElement("div");
  var p = document.createElement("p");
  p.innerText= "log in to enter";
  div.style.color= "rgba(75,0,130,.5)";
  div.style.fontFamily="helvetica";
  div.style.fontSize="30px";
  p.style.padding= "10px";
  div.appendChild(p);

  bigDiv.appendChild(intro);
  bigDiv.appendChild(div1);
  bigDiv.appendChild(div);

  body.appendChild(bigDiv);

  var inputName1 = document.getElementById("firstInput");
  inputName1.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 13) {
      person.name = inputName1.value;
      console.log(person);
      chatRoom();
    }
  });

}

var chatRoom = function() {

  console.log("hey!");

  client.send(person.name);

  var body = document.getElementById("the_body");

  var bigDiv = document.getElementById("bigDiv");

  body.removeChild(bigDiv);

  var bigDiv2 = document.createElement("div");
  bigDiv2.id = "bigDiv2";

  body.style.background="url(images/talkbubble.png)";
  body.style.backgroundSize="contain";
  body.style.backgroundColor="rgba(255,255,255,.5)";

  var divSidebar1 =createSideBar();
  var divInput1 =createInputArea();
  var divChat1 = createChatArea();
  //grab sideBar by id #sidebar
  bigDiv2.appendChild(divSidebar1);
  //grab divChat by id #chat
  bigDiv2.appendChild(divChat1);
  //grab divInput by id #inputArea
  bigDiv2.appendChild(divInput1);

  body.appendChild(bigDiv2);

  var input = document.getElementById("message");
  input.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 13) {
      var clientMessage = input.value;
      person.message = clientMessage;
      client.send(JSON.stringify(person));
      input.value = "";
    }
  });
}


var createSideBar = function() {
  var divSidebar = document.createElement("div");
  divSidebar.id= "sidebar";
  divSidebar.style.backgroundColor="rgba(255,250,250,.7)"
  divSidebar.style.float= "left";
  divSidebar.style.width="25%";
  divSidebar.style.height="100%";
  divSidebar.style.border="5px";
  divSidebar.style.borderRightStyle="solid";

  var empty = [];
  var uListF1 =createFriendList(empty);
  var helloGuest1 =createHelloGuest();

  divSidebar.appendChild(helloGuest1);
  divSidebar.appendChild(uListF1);
  return divSidebar;
}

var createHelloGuest = function() {
  var helloGuest = document.createElement("div");
  helloGuest.id = "helloGuest";
  var hello = document.createElement("p");
  var guest = document.createElement("p");
  hello.innerText = "HELLO ";
  guest.innerText= person.name.toUpperCase() + "!";
  hello.style.textShadow="0 0 8px darkcyan";
  guest.style.textShadow="0 0 8px darkcyan";
  helloGuest.style.textAlign="center";
  helloGuest.style.fontFamily="arial";
  helloGuest.style.fontWeight="bolder";
  helloGuest.style.fontSize="28px";
  helloGuest.style.display="inlineBlock";
  helloGuest.style.color="white";
  // helloGuest.style.backgroundColor="rgba(255,255,255,.8)";
  // helloGuest.style.borderRadius="20%";
  helloGuest.style.marginLeft= "auto";
  helloGuest.style.marginRight= "auto";
  helloGuest.style.marginTop= "5%";
  helloGuest.style.padding="10px";
  helloGuest.style.height="20%"
  helloGuest.style.width="75%";
  helloGuest.appendChild(hello);
  helloGuest.appendChild(guest);
  return helloGuest;
}

var createFriendList = function(arr) {
  var uListF = document.createElement("ul");
  uListF.id = "friendList";
  uListF.innerText="FRIENDS";
  uListF.style.textShadow="0 0 2px black";
  uListF.style.listStyle="none";
  uListF.style.fontFamily="arial";
  uListF.style.fontWeight="bold";
  uListF.style.fontSize="24px";
  uListF.style.color="white";
  uListF.style.textAlign="left";
  uListF.style.fontWeight="bold";
  uListF.style.marginTop="30px";

  arr.forEach(function(elem) {
    if(elem != person.name) {
      var li = document.createElement("li");
      li.setAttribute("class","frendz");
      li.innerText = elem;
      li.style.listStyleType="circle";
      li.style.fontSize="20px";
      li.style.padding="5px";
      li.style.color="rgba(52,213,201,.9)";
      li.style.textShadow=" 0 0 1px white";
      uListF.appendChild(li);
    }
  });
  return uListF;
}

var createChatArea = function() {
  var divChat = document.createElement("div");
  divChat.id= "chat";
  divChat.style.backgroundColor="rgba(255,250,250,.8)";
  divChat.style.overflow="auto";
  divChat.scrollTop= divChat.scrollHeight;
  divChat.style.textAlign="left";
  divChat.style.marginLeft= "30%"
  divChat.style.border= "2px dashed silver"
  divChat.style.borderRadius="9%";
  divChat.style.height="90%";
  divChat.style.width="65%";
  var uListC1 =createChatList();
  divChat.appendChild(uListC1);
  return divChat;
}

var createChatList = function() {
  var liGreeting = document.createElement("li");
  liGreeting.id="connected";
  liGreeting.innerText= greeting;
  liGreeting.style.listStyle="none";
  var uListC = document.createElement("ul");
  uListC.id="chatList";
  uListC.style.display="block"
  uListC .appendChild(liGreeting);
  return uListC;
}

var createInputArea = function() {
  var divInput = document.createElement("div");
  divInput.id= "inputArea";
  divInput.style.position="absolute";
  divInput.style.overflow="auto";
  divInput.style.bottom="0%";
  divInput.style.marginLeft= "28%"
  divInput.style.marginRight= "10%"
  divInput.style.border="3px solid silver";
  divInput.style.height="6%";
  divInput.style.width="70%";
  var inputMessage1 =createInputMessage();
  divInput.appendChild(inputMessage1);
  return divInput;
}

var createInputMessage = function() {
  var inputMessage = document.createElement("input");
  inputMessage.id="message";
  inputMessage.setAttribute("type","text");
  inputMessage.style.color="darkblue";
  inputMessage.style.fontFamily="helvetica";
  inputMessage.style.fontSize="20px";
  inputMessage.style.height="100%";
  inputMessage.style.width="100%";
  return inputMessage;
}
