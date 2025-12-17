import { loginAdmService } from "../services/login.services.js";

const loginButton = document.getElementById('login-button');

loginButton.addEventListener("click", () => {
    loginAdmPage();
})

async function loginAdmPage(){
    const userEmail = document.getElementById('email-input').value;    
    const userPassword = document.getElementById('password-input').value;
    
    try{
        const result = await loginAdmService(userEmail, userPassword);

        const data = await result.json();

        if(!result.ok){
            document.getElementById('message').innerHTML = result.message;
        }

        localStorage.setItem("token", data.token);
        document.getElementById('message').innerHTML = 'Login realizado com sucesso!';

        window.location.href = 'dashboard.adm.html';
    }catch(err){
        console.error(err);
        document.getElementById('message').innerHTML = 'Erro ao se conectar com o servidor!';
    }
};