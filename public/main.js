const socket = io()


const clientsTotatl = document.getElementById('clients-total')
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');


messageForm.addEventListener('submit',(e) => {
    e.preventDefault();

    sendMessage();
})
socket.on('clients-total', (data) => {
    console.log(data);

    clientsTotatl.innerHTML = `Total clients: ${data}`
})



function sendMessage() {
    
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }

    socket.emit('message', data);

    addMessageToUi(true, data);

    messageInput.value = '';

}



socket.on('chat-message', (data) => {
    console.log(data);

    addMessageToUi(false, data);
})


function addMessageToUi(isOwnMessage, data){
    console.log(isOwnMessage);
    const element = `<li class="${isOwnMessage ? 'message-right' : 'message-left'}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} | ${data.dateTime}</span>
                </p>
            </li>`;
    


    messageContainer.innerHTML += element;
}