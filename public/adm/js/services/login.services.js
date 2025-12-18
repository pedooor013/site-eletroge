import { loginAdmApi } from '../api/loginAdm.api.js';


export async function loginAdmService(email, password){
    try{
        const response = await loginAdmApi(email, password);
        
        if(!response.ok){
            throw new Error(response.message || "Erro ao realizar login");
        }
        
        localStorage.setItem('token', response.token);

        return response;
    }catch(err){
        throw err; 
    }
};  