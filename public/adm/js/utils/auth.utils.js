// Funções utilitárias para autenticação

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function isAuthenticated() {
    return !!getToken();
}

export function getAuthHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}
export function requireAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/adm/views/login.page.html';
    }
}
