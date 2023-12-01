const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");
var count = 0;
$(document).ready(function(){
  $('.openChatBot').show();
  $('.container').hide();
});
$('.closeBtn').click(function(){
  $('.openChatBot').show();
  $('.container').hide();
});

$('.openChatBot').click(function(){
  $('.openChatBot').hide();
  $('.container').show();
  if(count == 0){
  setTimeout(() => {
    renderChatbotResponse("intro");
    setScrollPosition();
  }, 1000);
  count = 1;
  }
});

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

const renderUserMessage = () => {
  var userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  userInput = keyWords(userInput.toLocaleLowerCase());
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
  setScrollPosition();
};

const getChatbotResponse = (userInput) => {
  return responseObj[userInput];
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
function keyWords(userInput){
  var keys = Object.keys(responseObj);
  var temp="";
  for(var i=0; i<keys.length; i++){
    if(userInput.match(keys[i]))
    {
      temp = keys[i];
    }
  }
  return temp != ""? temp : "reachus";
}



