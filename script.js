async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();

    if (text === '') return;

    addMessage(text, 'user');
    input.value = '';

    try {
        // Envia a mensagem para o backend em Java
        const response = await fetch('http://localhost:8080/api/psicologa/conversar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto: text })
        });

        const data = await response.json();
        addMessage(data.resposta, 'bot');
    } catch (error) {
        addMessage("Desculpe, não foi possível conectar com a Sophia no momento. Verifique se o servidor Java está rodando.", 'bot');
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const p = document.createElement('p');
    p.innerText = text;
    
    messageDiv.appendChild(p);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}