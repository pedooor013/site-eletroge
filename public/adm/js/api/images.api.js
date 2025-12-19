import { API_ROUTES } from '../config/api.routes.js';

export async function uploadImagesApi(files) {
    try {
        const formData = new FormData();





        // Verifica cada arquivo antes de adicionar
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            formData.append("imagens", file);
        }

        // Verifica o que foi adicionado no FormData

        for (let pair of formData.entries()) {

        }

        const url = API_ROUTES.UPLOAD_IMAGES;



        // ✅ CRIA UM ABORTCONTROLLER COM TIMEOUT MAIOR
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos

        const response = await fetch(url, {
            method: "POST",
            body: formData,
            signal: controller.signal
        });

        clearTimeout(timeoutId); // Limpa o timeout se deu certo



        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer upload das imagens');
        }

        // ✅ VERIFICA SE RETORNOU IMAGENS
        if (!data.arrImage || data.arrImage.length === 0) {
            console.error("❌ API não retornou imagens!");
            throw new Error('API não processou as imagens');
        }



        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error("❌ Timeout: Upload demorou mais de 60 segundos");
            throw new Error('Upload demorou muito tempo. Tente com imagens menores.');
        }
        console.error("❌ Erro completo:", err);
        console.error("❌ Mensagem:", err.message);
        throw new Error('Erro ao fazer upload das imagens');
    }
}