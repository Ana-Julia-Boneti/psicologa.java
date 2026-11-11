// ABRIR E FECHAR O CHAT
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (chatBox.classList.contains('open')) {
        chatBox.classList.remove('open');
        toggleIcon.innerText = '▼';
    } else {
        chatBox.classList.add('open');
        toggleIcon.innerText = '▲';
        // Rola até o chat suavemente
        chatBox.scrollIntoView({ behavior: 'smooth' });
    }
}

// LÓGICA DO CHAT
function enviarMensagem() {
    const input = document.getElementById('userInput');
    const texto = input.value.trim();

    if (texto === '') return;

    adicionarMensagem(texto, 'user');
    input.value = '';

    setTimeout(() => {
        const resposta = processarRespostaIA(texto);
        adicionarMensagem(resposta, 'bot');
    }, 500);
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        enviarMensagem();
    }
}

function adicionarMensagem(texto, tipo) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${tipo}`;
    div.innerText = texto;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function processarRespostaIA(mensagem) {
    const msg = mensagem.toLowerCase();

    if (msg.includes('oi') || msg.includes('olá') || msg.includes('ola') || msg.includes('salve maria') || msg.includes('boa tarde') || msg.includes('bom dia') || msg.includes('boa noite')) {
        return "Salve Maria! ✠ É uma alegria conversar com você. Como posso te acompanhar hoje? Fique à vontade para conversar sobre sua vida de oração, vocação ou tirar dúvidas sobre a fé.";
    }

    if (msg.includes('bento') || msg.includes('são bento') || msg.includes('sao bento')) {
        return "São Bento de Núnrsia é o Pai do Monacato Ocidental e padroeiro da Europa. Seu lema é 'Ora et Labora' (Oração e Trabalho). É muito invocado para proteção espiritual contra as ciladas do mal através de sua medalha sagrada.";
    }

    if (msg.includes('miguel') || msg.includes('são miguel') || msg.includes('sao miguel')) {
        return "São Miguel Arcanjo é o príncipe das milícias celestes e defensor das almas nas batalhas espirituais. Seu nome significa 'Quem como Deus?'. É o padroeiro perfeito para momentos de combate e busca de coragem.";
    }

    if (msg.includes('teresinha') || msg.includes('teresa') || msg.includes('santa teresinha')) {
        return "Santa Teresinha do Menino Jesus ensinou a 'Pequena Via', um caminho de santidade baseado em fazer pequenas coisas diárias com um amor extraordinário a Deus. Prometeu derramar uma chuva de rosas sobre a Terra após a sua morte.";
    }

    if (msg.includes('agostinho') || msg.includes('santo agostinho')) {
        return "Santo Agostinho viveu uma juventude distante de Deus, mas converteu-se após anos de oração de sua mãe, Santa Mônica. Tornou-se um dos maiores teólogos da Igreja, ensinando que nosso coração permanece inquieto enquanto não repousa em Deus.";
    }

    if (msg.includes('vocacao') || msg.includes('vocação') || msg.includes('chamado') || msg.includes('casamento') || msg.includes('padre') || msg.includes('freira')) {
        return "O discernimento vocacional é uma escuta atenta do coração. Deus fala através do silêncio, da oração e da paz profunda na alma. Para entender seu chamado, dedique um tempo diário diante do Santíssimo Sacramento e converse com um bom sacerdote.";
    }

    if (msg.includes('frieza') || msg.includes('aridez') || msg.includes('desanimo') || msg.includes('desânimo') || msg.includes('triste') || msg.includes('pecado')) {
        return "A aridez espiritual é uma fase que até os grandes Doutores da Igreja viveram. Lembre-se: amar a Deus não é sentir emoções, mas tomar a decisão de ser fiel. Mantenha a Confissão frequente e a Eucaristia mesmo quando não sentir nada.";
    }

    return `Compreendo o que você traz no coração: "${mensagem}". Entregar todas as intenções e dúvidas nas mãos do Senhor traz repouso à alma. Como posso te orientar melhor à luz da fé católica?`;
}