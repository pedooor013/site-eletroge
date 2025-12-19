// Configuração centralizada das rotas da API
const API_BASE_URL = 'http://localhost:3000/eletroge';

export const API_ROUTES = {
    // Login
    LOGIN: `${API_BASE_URL}/login`,
    
    // Obras
    WORKS: `${API_BASE_URL}/obras`,
    WORK_DETAILS: (id) => `${API_BASE_URL}/obras/detalhes/${id}`,
    CREATE_WORK: `${API_BASE_URL}/cadastrarObra`,
    UPDATE_WORK: (id) => `${API_BASE_URL}/editarObra/${id}`,
    DELETE_WORK: (id) => `${API_BASE_URL}/deletarObra/${id}`,
    
    // Imagens
    UPLOAD_IMAGES: `${API_BASE_URL}/upload`
};