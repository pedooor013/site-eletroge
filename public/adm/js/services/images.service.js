import { uploadImagesApi } from '/adm/js/api/images.api.js';

export async function uploadImagesService(files) {
    try {

        if (!files || files.length === 0) {
            throw new Error('Nenhuma imagem selecionada');
        }

        const result = await uploadImagesApi(files);

        if (!result.ok) {
            throw new Error('Erro ao fazer upload das imagens');
        }

        // ✅ CONVERTE o array de objetos para array de URLs
        const imageUrls = result.arrImage.map(img => img.url);

        return imageUrls;
    } catch (err) {
        throw err;
    }
}