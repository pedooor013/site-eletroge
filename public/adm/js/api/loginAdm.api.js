const loginAdmApiRoute = 'http://localhost:3000/eletroge/login';

export async function loginAdmApi(email, password){
    try{
        const response = await fetch(loginAdmApiRoute, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();
        
        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    }catch(err){
        console.error("Erro na API: ", err);
        throw new Error('Erro de conexão com o servidor');
    };
};