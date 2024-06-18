const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const nickInput = document.getElementById('nick-input');
const socket = io();

function sendMessage() {
    const nick = nickInput.value;
    const message = messageInput.value;
    const date = new Date().toLocaleString();

    if (nick && message) {
        socket.emit('message', { nick, message, date });
        messageInput.value = '';
    }
}

socket.on('message', (data) => {
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = `<strong>${data.nick}</strong>: ${data.message}`;

    const dateElement = document.createElement('span');
    dateElement.className = 'date';
    dateElement.textContent = data.date;

    newMessage.appendChild(dateElement);
    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

// Обработчик нажатия Enter для отправки сообщения
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
