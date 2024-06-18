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

function insertSmiley(smiley) {
    messageInput.value += smiley;
}

socket.on('message', (data) => {
    const newMessage = document.createElement('div');
    newMessage.className = 'message-box';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<strong>${data.nick}</strong>: ${data.message}`;

    const messageDate = document.createElement('span');
    messageDate.className = 'message-date';
    messageDate.textContent = data.date;
    messageDate.style.color = '#888';

    const messageActions = document.createElement('div');
    messageActions.className = 'message-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
        // Handle copy action
        const text = messageContent.textContent;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch((error) => {
            console.error('Could not copy text: ', error);
        });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        // Handle delete action
        newMessage.remove();
    });

    messageActions.appendChild(copyBtn);
    messageActions.appendChild(deleteBtn);

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageDate);
    newMessage.appendChild(messageActions);

    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

// Обработчик нажатия Enter для отправки сообщения
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
