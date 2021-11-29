const socket = io.connect("http://localhost:3000");

const form = document.getElementById("form-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".message-container");

const append = (message, position) =>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.onclick = ()=>{
        messageElement.innerHTML += "<button mid='"+ message +"' onclick='deleteMessage(this);'>delete</button>";
    }
   
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const deleteMessage = (self) =>{
    
      const id = self.getAttribute("mid");
      console.log(id);
      socket.emit("delete", id);
    
}


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value=" "
});
const name = prompt("Enter your name to join");
socket.emit("new-user-join", name);

socket.on("user-joined", (name)=>{
    append(`${name} join the chat`, "left");
});

socket.on("receive", (data)=>{
    append(`${data.name} : ${data.message}`, "left");
});

socket.on("leave", (name)=>{
    append(`${name}: leave the chat`, "left");
});


socket.on("delete", (id)=>{
    const node = document.getElementsByClassName("message" + id);
    node.innerHTML = "this message has been deleted";
});

