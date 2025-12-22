export const API_ROUTES = {
    // Login
    LOGIN: `/login`,
    
    // Obras
    WORKS: `/obras`,
    WORK_DETAILS: (id) => `/obras/detalhes/${id}`,
    CREATE_WORK: `/cadastrarObra`,
    UPDATE_WORK: (id) => `/editarObra/${id}`,
    DELETE_WORK: (id) => `/deletarObra/${id}`,
    
    // Imagens
    UPLOAD_IMAGES: `/upload`
};