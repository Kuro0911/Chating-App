const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const msg_inp = document.getElementById('msg_inp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('iphone_ding.mp3')


const append = (message , position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left' || position == 'center'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msg_inp.value;
    append(`You: ${message}` , 'right')
    socket.emit('send' , message);
    msg_inp.value = '';
});
const name = prompt('Enter your name to join');
socket.emit('new-user-joined' , name);

socket.on('user-joined' , name =>{
    append(`${name} joined the chat` , 'center')
});

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}` , 'left')
});

socket.on('dc' , name =>{
    append(`${name} left the chat ` , 'center')
});