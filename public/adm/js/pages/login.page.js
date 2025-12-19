import { loginService } from '../services/login.services.js';

// Inicialização da página de login
function initLoginPage() {
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        loginButton.addEventListener("click", handleLogin);
    }
}

// Handler do botão de login
async function handleLogin() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const messageElement = document.getElementById('message');

    // Limpa mensagens anteriores
    messageElement.innerHTML = "";

    // Validação básica
    if (!email || !password) {
        messageElement.innerText = "Preencha todos os campos!";
        return;
    }

    try {
        await loginService(email, password);
        
        messageElement.innerHTML = "Login realizado com sucesso!";
        messageElement.classList.remove('text-danger');
        messageElement.classList.add('text-success');
        
        // Redireciona para o dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.adm.html';
        }, 500);

    } catch (err) {
        messageElement.classList.remove('text-success');
        messageElement.classList.add('text-danger');
        messageElement.innerText = err.message || "Erro ao realizar login";
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
    initLoginPage();
}