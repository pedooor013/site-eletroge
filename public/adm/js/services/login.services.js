import { loginApi } from '../api/login.api.js';
import { saveToken } from '../utils/auth.utils.js';

export async function loginService(email, password) {
    try {
        const result = await loginApi(email, password);

        if (!result.ok) {
            throw new Error(result.message || "Erro ao realizar login");
        }

        // Salva o token no localStorage
        saveToken(result.token);

        return {
            success: true,
            message: "Login realizado com sucesso!",
            token: result.token
        };
    } catch (err) {
        throw err;
    }
}