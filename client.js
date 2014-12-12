var client = new WebSocket("ws://localhost:3000");

var Client = function( ) {
  this.name = "";
  this.message= "";
}
var person = new Client();
// var enter = false;



client.addEventListener("open", function(evt) {
  console.log("you are connected!")
  introPage();
});


// client.addEventListener("message", function(evt) {
//   var processedMessage = JSON.parse(evt.data);
//   var li = document.createElement("li");
//   li.innerText=
//   li.style.listStyle = "none";
//   var uL = document.querySelector("ul");
//   uL.appendChild(li);
//
// });

// var input = document.querySelector("input");
// input.addEventListener("keydown", function(evt) {
//   if(evt.keyCode === 13) {
//     var clientMessage = input.value;
//     if (userName === false) {
//       user.moniker = clientMessage;
//       userName = true;
//     } else {
//       user.msg = clientMessage;
//       client.send(JSON.stringify(user));
//     }
//     input.value = "";
//   }
// });

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
      client.send(JSON.stringify(person));
      chatRoom();
      // enter = true;
    }
  });
}

var chatRoom = function() {
  // debugger;
   var body = document.getElementById("the_body");
  console.log("hey");
   var bigDiv = document.getElementById("bigDiv");
  console.log("ho");

  body.removeChild(bigDiv);

  var bigDiv2 = document.createElement("div");
  bigDiv2.id = "bigDiv2";

  body.style.backgroundColor="rgba(203,189,219,.4)";

  var divSidebar = document.createElement("div");
  divSidebar.id= "sidebar";
  divSidebar.style.float= "left";
  divSidebar.style.width="25%";
  divSidebar.style.height="100%";
  divSidebar.style.border="1px solid silver";
  divSidebar.style.borderRadius="5%";

  var divInput = document.createElement("div");
  divInput.id= "inputArea";
  divInput.style.position="absolute";
  divInput.style.bottom="0%";
  divInput.style.marginLeft= "28%"
  divInput.style.marginRight= "10%"
  divInput.style.border="1px solid silver";
  divInput.style.borderRadius="5%";
  divInput.style.height="25%";
  divInput.style.width="70%";

  var divChat = document.createElement("div");
  divChat.id= "chat";
  divChat.style.marginLeft= "30%"
  divChat.style.marginRight="30%";
  divChat.style.border= "1px dashed silver"
  divChat.style.borderRadius="10%";
  divChat.style.height="70%";
  divChat.style.width="60%";

  bigDiv2.appendChild(divSidebar);
  bigDiv2.appendChild(divChat);
  bigDiv2.appendChild(divInput);


  body.appendChild(bigDiv2);
}
