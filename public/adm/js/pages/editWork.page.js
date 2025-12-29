import { getAllWorksService, getWorkDetailsService, updateWorkService } from '/adm/js/services/works.service.js';
import { uploadImagesService } from '/adm/js/services/images.service.js';
import { createExistingImagePreview, clearPreviewArea, createImagePreview } from '/adm/js/utils/image.utils.js';

let currentWorkId = null;
let currentWorkImages = [];
let deletedWorkImages = [];
let selectedFiles = [];

// Inicialização da página
function initEditWorkPage() {
    loadWorksIntoSelect();

    const selectForm = document.querySelector("form");
    const updateButton = document.getElementById('update-work-button');
    const imageInput = document.getElementById('send-img-work');

    if (selectForm) {
        selectForm.addEventListener("submit", handleSelectWork);
    }

    if (updateButton) {
        updateButton.addEventListener('click', handleUpdateWork);
    }

    if (imageInput) {
        imageInput.addEventListener('change', handleImageSelection);
    }
}

// Carrega obras no select
async function loadWorksIntoSelect() {
    try {
        const works = await getAllWorksService();
        const select = document.getElementById("select-work-to-edit");

        works.forEach(work => {
            const option = document.createElement("option");
            option.value = work.id;
            option.textContent = `${work.id} - ${work.nome}`;
            select.appendChild(option);
        });
    } catch (err) {
        alert("Erro ao carregar lista de obras");
    }
}

// Handler de seleção de obra
async function handleSelectWork(e) {
    e.preventDefault();

    const selectedId = document.getElementById("select-work-to-edit").value;
    if (!selectedId) return;

    await loadWorkDetails(selectedId);
}

// Carrega detalhes da obra selecionada
async function loadWorkDetails(id) {
    try {
        currentWorkId = id;
        const work = await getWorkDetailsService(id);

        // Preenche campos simples
        document.getElementById("workName").value = work.nome || "";
        document.getElementById("workDescription").value = work.descricao || "";
        document.getElementById("workProgress").value = work.progresso || 0;

        // Marca serviços
        checkWorkServices(work.servicos);

        // Renderiza imagens
        renderWorkImages(work.imagens);

    } catch (err) {
        alert("Erro ao carregar detalhes da obra");
    }
}

// Marca os checkboxes dos serviços
function checkWorkServices(services) {
    // Desmarca todos primeiro
    document.querySelectorAll('input[name="work-service"]').forEach(cb => cb.checked = false);

    if (!services || services.length === 0) return;

    services.forEach(service => {
        const checkbox = document.getElementById(service.id || service.service_id);
        if (checkbox) checkbox.checked = true;
    });
}

// Renderiza as imagens existentes da obra
function renderWorkImages(images) {
    clearPreviewArea("preview-area");

    currentWorkImages = images.map(img => ({ id: img.id, url: img.url }));
    deletedWorkImages = [];

    const previewArea = document.getElementById("preview-area");

    currentWorkImages.forEach((imgObj, index) => {
        const wrapper = createExistingImagePreview(imgObj, removeExistingImage, index);
        previewArea.appendChild(wrapper);
    });
}

// Remove imagem existente
window.removeExistingImage = function(index) {
    deletedWorkImages.push(currentWorkImages[index]);
    currentWorkImages.splice(index, 1);
    renderWorkImages(currentWorkImages);
};

// Handler de seleção de novas imagens
async function handleImageSelection(event) {
    selectedFiles = Array.from(event.target.files);
    await updatePreviewWithNew();
}

// Atualiza preview mantendo imagens existentes e adicionando novas
async function updatePreviewWithNew() {
    const previewArea = document.getElementById("preview-area");
    
    // Renderiza imagens existentes primeiro
    renderWorkImages(currentWorkImages);

    // Adiciona novas imagens ao preview
    for (let i = 0; i < selectedFiles.length; i++) {
        const wrapper = await createImagePreview(selectedFiles[i], removeNewImage, i);
        previewArea.appendChild(wrapper);
    }
}

// Remove nova imagem (ainda não enviada)
function removeNewImage(index) {
    selectedFiles.splice(index, 1);
    updatePreviewWithNew();
}

// Handler de atualização da obra
async function handleUpdateWork() {
    try {
        if (!currentWorkId) {
            alert("Selecione uma obra primeiro!");
            return;
        }

        const name = document.getElementById('workName').value;
        const description = document.getElementById('workDescription').value;
        const progress = document.getElementById('workProgress').value;

        // Coleta serviços selecionados
        const selectedServiceIds = [];
        document.querySelectorAll('input[name="work-service"]:checked')
            .forEach(cb => selectedServiceIds.push(Number(cb.id)));

        // Upload de novas imagens (se houver)
        let uploadedImages = null;
        if (selectedFiles.length > 0) {
            uploadedImages = await uploadImagesService(selectedFiles);
        }

        // Monta objeto de atualização
        const updateBody = {};

        if (name.trim()) updateBody.name = name;
        if (description.trim()) updateBody.description = description;
        if (progress !== "") updateBody.progress = Number(progress);

        updateBody.arrServicesId = selectedServiceIds;
        updateBody.remainingImages = currentWorkImages;
        updateBody.deletedImages = deletedWorkImages;

        if (uploadedImages !== null) {
            updateBody.newImages = uploadedImages;
        }

        // Atualiza a obra
        const result = await updateWorkService(currentWorkId, updateBody);

        alert(result.message);
        location.reload();

    } catch (err) {
        alert(err.message || "Erro ao atualizar obra");
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditWorkPage);
} else {
    initEditWorkPage();
}