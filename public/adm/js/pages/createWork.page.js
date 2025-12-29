import { createWorkService } from '/adm/js/services/works.service.js';
import { uploadImagesService } from '/adm/js/services/images.service.js';
import { validateImageCount, clearPreviewArea, createImagePreview } from '/adm/js/utils/image.utils.js';

let selectedFiles = [];

// Inicialização da página
function initCreateWorkPage() {
    const createButton = document.getElementById('create-work-button');
    const imageInput = document.getElementById('send-img-work');

    if (createButton) {
        createButton.addEventListener('click', handleCreateWork);
    }

    if (imageInput) {
        imageInput.addEventListener('change', handleImageSelection);
    }
}

// Handler de seleção de imagens
async function handleImageSelection(event) {
    selectedFiles = Array.from(event.target.files);

    await updatePreview();
}

// Atualiza o preview das imagens selecionadas
async function updatePreview() {
    const previewArea = document.getElementById("preview-area");
    clearPreviewArea("preview-area");

    for (let i = 0; i < selectedFiles.length; i++) {
        const wrapper = await createImagePreview(selectedFiles[i], removeImage, i);
        previewArea.appendChild(wrapper);
    }
}

// Remove uma imagem do preview
function removeImage(index) {
    selectedFiles.splice(index, 1);
    updatePreview();
}

// Handler de criação da obra
async function handleCreateWork() {
    try {

        
        // ✅ MOSTRA LOADING
        const createButton = document.getElementById('create-work-button');
        const originalText = createButton.textContent;
        createButton.disabled = true;
        createButton.textContent = 'Fazendo upload das imagens...';
        
        // Coleta dados do formulário
        const workName = document.getElementById('workName').value;
        const workDescription = document.getElementById('workDescription').value;
        const workProgress = document.getElementById('workProgress').value;



        // Valida progresso
        if (workProgress > 100 || workProgress < 0) {
            alert("O progresso deve ser um número entre 0 e 100.");
            createButton.disabled = false;
            createButton.textContent = originalText;
            return;
        }

        // Coleta serviços selecionados
        const idService = [];
        document.querySelectorAll('input[name="work-service"]:checked')
            .forEach(cb => idService.push(Number(cb.id)));



        // Valida número de imagens
        if (!validateImageCount(selectedFiles, 4)) {
            alert("Selecione exatamente 4 imagens!");
            createButton.disabled = false;
            createButton.textContent = originalText;
            return;
        }
        // Faz upload das imagens
        const uploadedImages = await uploadImagesService(selectedFiles);

        // ✅ ATUALIZA TEXTO DO BOTÃO
        createButton.textContent = 'Cadastrando obra...';

        // Monta o objeto de dados
        const workData = {
            name: workName,
            description: workDescription,
            progress: Number(workProgress),
            arrServicesId: idService,
            arrImage: uploadedImages
        };
        
        console.log("📦 DADOS COMPLETOS QUE SERÃO ENVIADOS:");
        console.log("workData:", JSON.stringify(workData, null, 2));
        console.log("Tipo de arrImage:", typeof workData.arrImage);
        console.log("É array?", Array.isArray(workData.arrImage));
        console.log("Conteúdo de arrImage:", workData.arrImage);
        // Cria a obra
        const result = await createWorkService(workData);

        alert(result.message);

        // ✅ RESTAURA BOTÃO
        createButton.disabled = false;
        createButton.textContent = originalText;

        // Limpa o formulário
        resetForm();

    } catch (err) {
        console.error("❌ Erro ao cadastrar obra:", err);
        console.error("❌ Mensagem:", err.message);
        console.error("❌ Stack completo:", err.stack);
        
        // ✅ RESTAURA BOTÃO EM CASO DE ERRO
        const createButton = document.getElementById('create-work-button');
        createButton.disabled = false;
        createButton.textContent = 'Cadastrar a Obra';
        
        alert(err.message || "Erro ao cadastrar obra");
    }
}

// Reseta o formulário
function resetForm() {
    selectedFiles = [];
    clearPreviewArea("preview-area");
    
    const imageInput = document.getElementById("send-img-work");
    if (imageInput) {
        imageInput.value = "";
    }

    document.getElementById('workName').value = "";
    document.getElementById('workDescription').value = "";
    document.getElementById('workProgress').value = "";
    
    document.querySelectorAll('input[name="work-service"]:checked')
        .forEach(cb => cb.checked = false);
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCreateWorkPage);
} else {
    initCreateWorkPage();
}