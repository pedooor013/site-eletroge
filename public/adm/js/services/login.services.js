import { loginAdmApi } from '../api/loginAdm.api.js';


export async function loginAdmService(userEmail, userPassword){
    if(userEmail == null){
        return "Preencha o campo de e-mail!";
    }else if(userPassword == null){
        return "Preencha o campo de senha!";
    };
    try{
        const result = await loginAdmApi(userEmail, userPassword);
        const data = await result.json();
        
        if(!result.ok){
            throw new Error(data.message || "Erro ao realizar login");
        }
        
        localStorage.setItem('token', data.token);

        return data;
    }catch(err){
        throw err; 
    }
};  