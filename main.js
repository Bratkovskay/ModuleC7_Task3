const wsUri = "wss://echo-ws-service.herokuapp.com/";

const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const content = document.querySelector('.chat-Content');
const input = document.getElementById('numberInput');
const location = document.querySelector('geo-location');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  content.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnClose.addEventListener('click', () => {
  websocket.close();
  websocket = null;
});

btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
});

location.addEventListener(fetch("https://www.openstreetmap.org")
.then(() => {
    const link = document.createElement('a');
    link.href.innerHTML = 'https://www.openstreetmap.org/'
    content.appendChild(link)}));

