import { loginAdmService } from "../services/login.services.js";

const loginButton = document.getElementById('login-button');

loginButton.addEventListener("click", () => {
    loginAdmPage();
})

async function loginAdmPage(){
    const email = document.getElementById('email-input').value;    
    const password = document.getElementById('password-input').value;
    
    document.getElementById('message').innerHTML = "";
    try{        
        const test = await loginAdmService(
            email, 
            password
        );

        console.log({test});

        window.location.href = 'dashboard.adm.html';
    
    }catch(err){
        document.getElementById('message').innerText = err.message;
    }
};