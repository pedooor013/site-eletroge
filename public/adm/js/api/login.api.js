import { API_ROUTES } from '/adm/js/config/api.routes.js';

export async function loginApi(email, password) {
    try {
        console.log('Antes de entrar na API de login')
        const response = await fetch(API_ROUTES.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        console.log({response});
        const data = await response.json();

        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        console.error("Erro na API de login:", err);
        throw new Error('Erro de conexão com o servidor');
    }
}