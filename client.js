var client = new WebSocket("ws://localhost:3000");

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

  inputName.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 13) {
      person.name = inputName.value;
      console.log(person);
      chatRoom();
    }
  });
}

var chatRoom = function() {

  client.send(person.name);

  var body = document.getElementById("the_body");

  var bigDiv = document.getElementById("bigDiv");

  body.removeChild(bigDiv);

  var bigDiv2 = document.createElement("div");
  bigDiv2.id = "bigDiv2";

  body.style.background="url(images/talkbubble.png)";
  body.style.backgroundSize="contain";
  body.style.backgroundColor="rgba(255,255,255,.5)";

  var divSidebar = document.createElement("div");
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

  var helloGuest = document.createElement("div");
  var hello = document.createElement("p");
  var guest = document.createElement("p");
  hello.innerText = "HELLO ";
  guest.innerText= person.name.toUpperCase() + "!";
  hello.style.textShadow="0 0 8px darkcyan";
  guest.style.textShadow="0 0 8px darkcyan";
  // helloGuest.style.border="3px solid magenta";
  helloGuest.style.textAlign="center";
  helloGuest.style.fontFamily="arial";
  helloGuest.style.fontWeight="bolder";
  helloGuest.style.fontSize="28px";
  helloGuest.style.display="inlineBlock";
  helloGuest.style.color="white";
  helloGuest.style.backgroundColor="rgba(255,255,255,.8)";
  helloGuest.style.borderRadius="20%";
  helloGuest.style.marginLeft= "auto";
  helloGuest.style.marginRight= "auto";
  helloGuest.style.marginTop= "5%";
  helloGuest.style.padding="10px";
  helloGuest.style.height="20%"
  helloGuest.style.width="75%";
  divSidebar.id= "sidebar";
  divSidebar.style.backgroundColor="rgba(255,250,250,.7)"
  divSidebar.style.float= "left";
  divSidebar.style.width="25%";
  divSidebar.style.height="100%";
  divSidebar.style.border="5px";
  divSidebar.style.borderRightStyle="solid";
  helloGuest.appendChild(hello);
  helloGuest.appendChild(guest);
  divSidebar.appendChild(helloGuest);
  divSidebar.appendChild(uListF);

  var divInput = document.createElement("div");
  var inputMessage = document.createElement("input");
  inputMessage.id="message";
  inputMessage.setAttribute("type","text");
  inputMessage.style.color="darkblue";
  inputMessage.style.fontFamily="helvetica";
  inputMessage.style.fontSize="20px";
  inputMessage.style.height="100%";
  inputMessage.style.width="100%";
  divInput.id= "inputArea";
  divInput.style.position="absolute";
  divInput.style.overflow="auto";
  divInput.style.bottom="0%";
  divInput.style.marginLeft= "28%"
  divInput.style.marginRight= "10%"
  divInput.style.border="3px solid silver";
  divInput.style.height="25%";
  divInput.style.width="70%";
  divInput.appendChild(inputMessage);

  var divChat = document.createElement("div");
  var uListC = document.createElement("ul");
  var liGreeting = document.createElement("li");
  liGreeting.id="connected";
  liGreeting.innerText= greeting;
  liGreeting.style.listStyle="none";
  uListC.id="chatList";
  uListC.style.display="block"
  divChat.id= "chat";
  divChat.style.backgroundColor="rgba(255,250,250,.8)";
  divChat.style.overflow="auto";
  divChat.scrollTop= divChat.scrollHeight;
  divChat.style.textAlign="left";
  divChat.style.marginLeft= "30%"
  divChat.style.border= "2px dashed silver"
  divChat.style.borderRadius="9%";
  divChat.style.height="70%";
  divChat.style.width="65%";
  uListC .appendChild(liGreeting);
  divChat.appendChild(uListC);

  bigDiv2.appendChild(divSidebar);
  bigDiv2.appendChild(divChat);
  bigDiv2.appendChild(divInput);


  body.appendChild(bigDiv2);

  client.addEventListener("message", function(evt) {
    console.log(evt.data);
    var processedMessage = JSON.parse(evt.data);
    console.log(processedMessage);
    if (processedMessage.type === "friendList") {
      var list = processedMessage.list;
      list.forEach(function(name) {
        if(name != person.name) {
          var li = document.createElement("li");
          li.setAttribute("class","frendz");
          li.innerText = name;
          li.style.listStyleType="circle";
          li.style.fontSize="20px";
          li.style.padding="5px";
          li.style.color="rgba(52,213,201,.9)";
          li.style.textShadow=" 0 0 1px white";
          uListF.appendChild(li);
        }
      });
    } else if (processedMessage === "a new friend has joined the chat!"){
      var li = document.createElement("li");
      li.innerText= processedMessage;
      li.style.listStyle = "none";
      var uL = document.getElementById("chatList");
      uL.appendChild(li);
    } else if (processedMessage.type === "messageHistory") {
      console.log(processedMessage);
      console.log(processedMessage.list);
      var history = processedMessage.list;
      history.forEach(function(oldMessage) {
        var li = document.createElement("li");
        li.innerText= oldMessage.name + ": " + oldMessage.message;
        li.style.listStyle = "none";
        var uL = document.getElementById("chatList");
        uL.appendChild(li)
      })

    } else {
      var li = document.createElement("li");
      li.innerText= processedMessage.name + ": " + processedMessage.message;
      li.style.listStyle = "none";
      var uL = document.getElementById("chatList");
      uL.appendChild(li);
   }
});

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
