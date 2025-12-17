import { loginAdmService } from "../services/login.services.js";

const loginAdmApiRoute = 'http://localhost:3000/eletroge/login';

export async function loginAdmApi(userEmail, userPassword){
    try{
        const result = await fetch(loginAdmApiRoute, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ userEmail, userPassword })
        })

        return result;
    }catch(err){
        console.error(err);
    };
};