import { uploadImagesApi } from '../api/images.api.js';

export async function uploadImagesService(files) {
    try {
        console.log("🔧 SERVICE: Iniciando upload de imagens");
        console.log("🔧 SERVICE: Arquivos recebidos:", files);
        
        if (!files || files.length === 0) {
            throw new Error('Nenhuma imagem selecionada');
        }

        const result = await uploadImagesApi(files);
        
        console.log("✅ SERVICE: Resultado da API:", result);

        if (!result.ok) {
            throw new Error('Erro ao fazer upload das imagens');
        }

        console.log("✅ SERVICE: arrImage recebido:", result.arrImage);

        // ✅ CONVERTE o array de objetos para array de URLs
        const imageUrls = result.arrImage.map(img => img.url);
        
        console.log("✅ SERVICE: URLs extraídas:", imageUrls);

        return imageUrls;
    } catch (err) {
        console.error("❌ SERVICE: Erro no serviço de upload:", err);
        console.error("❌ SERVICE: Mensagem completa:", err.message);
        throw err;
    }
}