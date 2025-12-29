import { getAllWorksService, deleteWorkService } from '/adm/js/services/works.service.js';

let modalInstance = null;

// Inicialização da página
function initDeleteWorkPage() {
    loadWorksIntoSelect();

    const deleteButton = document.getElementById('delete-work-button');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    if (deleteButton) {
        deleteButton.addEventListener('click', openDeleteModal);
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', handleDeleteWork);
    }
}

// Carrega obras no select
async function loadWorksIntoSelect() {
    try {
        const works = await getAllWorksService();
        const select = document.getElementById("select-work-to-delete");

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

// Abre o modal de confirmação
function openDeleteModal() {
    const selectedId = document.getElementById("select-work-to-delete").value;

    if (!selectedId) {
        alert("Selecione uma obra para deletar!");
        return;
    }

    // Abre o modal do Bootstrap
    const modalEl = document.getElementById('confirmDeleteModal');
    modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
}

// Handler de deletar obra
async function handleDeleteWork() {
    const selectedId = document.getElementById("select-work-to-delete").value;

    if (!selectedId) {
        alert("Selecione uma obra para deletar!");
        return;
    }

    try {
        const result = await deleteWorkService(selectedId);
        
        // Fecha o modal
        if (modalInstance) {
            modalInstance.hide();
        }

        alert(result.message);
        
        // Recarrega a página após 1 segundo
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (err) {
        alert(err.message || "Erro ao deletar obra");
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeleteWorkPage);
} else {
    initDeleteWorkPage();
}