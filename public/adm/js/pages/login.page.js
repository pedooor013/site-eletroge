import { loginAdmService } from "../services/login.services.js";

const loginButton = document.getElementById('login-button');

loginButton.addEventListener("click", () => {
    loginAdmPage();
})

async function loginAdmPage(){
    const userEmail = document.getElementById('email-input').value;    
    const userPassword = document.getElementById('password-input').value;
    
    document.getElementById('message').innerHTML = "";
    try{
        
        const test = await loginAdmService(
            userEmail, 
            userPassword
        );

        console.log({test});

        window.location.href = 'dashboard.adm.html';
    
    }catch(err){
        document.getElementById('message').innerText = err.message;
    }
};