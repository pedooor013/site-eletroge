const BASE_URL = `https://eletroge.onrender.com/eletroge`

export const API_ROUTES = {
    // Login
    LOGIN: `${BASE_URL}/login`,
    
    // Obras
    WORKS: `${BASE_URL}/obras`,
    WORK_DETAILS: (id) => `${BASE_URL}/obras/detalhes/${id}`,
    CREATE_WORK: `${BASE_URL}/cadastrarObra`,
    UPDATE_WORK: (id) => `${BASE_URL}/editarObra/${id}`,
    DELETE_WORK: (id) => `${BASE_URL}/deletarObra/${id}`,
    
    // Imagens
    UPLOAD_IMAGES: `${BASE_URL}/upload`
};