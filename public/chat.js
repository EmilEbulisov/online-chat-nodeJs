const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const nickInput = document.getElementById('nick-input');
const socket = io();

function sendMessage() {
    const nick = nickInput.value.trim();
    const message = messageInput.value.trim();
    const date = new Date().toLocaleString();

    if (nick && message) {
        socket.emit('message', { nick, message, date });
        messageInput.value = '';
    }
}

function insertSmiley(smiley) {
    messageInput.value += smiley;
}

function newLine() {
    messageInput.value += '\n';
}

socket.on('message', (data) => {
    const newMessage = document.createElement('div');
    newMessage.className = 'message-box';

    if (data.nick.toLowerCase() === 'эмиль' || data.nick.toLowerCase() === 'emil') {
        newMessage.style.backgroundColor = '#77DD77';
    }
     else if (['гуля', 'гулч', 'gulya', 'gulch'].includes(data.nick.toLowerCase())) {
        newMessage.style.backgroundColor = '#D8BFD8';
    }
    else {
        newMessage.style.backgroundColor = 'white';
    }

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<strong>${data.nick}</strong>: ${data.message}`;

    const messageDate = document.createElement('span');
    messageDate.className = 'message-date';
    messageDate.textContent = data.date;

    const messageActions = document.createElement('div');
    messageActions.className = 'message-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn';
    copyBtn.textContent = 'Копировать';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${data.nick}: ${data.message}`).then(() => {
            console.log('Text copied to clipboard');
        }).catch((error) => {
            console.error('Could not copy text: ', error);
        });
    });

    const replyBtn = document.createElement('button');
    replyBtn.className = 'btn';
    replyBtn.textContent = 'Ответить';
    replyBtn.addEventListener('click', () => {
        messageInput.value = `@${data.nick} "${data.message}": `;
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
        newMessage.remove();
    });

    messageActions.appendChild(copyBtn);
    messageActions.appendChild(replyBtn);
    messageActions.appendChild(deleteBtn);

    newMessage.appendChild(messageContent);
    newMessage.appendChild(messageDate);
    newMessage.appendChild(messageActions);

    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        sendMessage();
        e.preventDefault();
    }
});
