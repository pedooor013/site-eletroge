import { API_ROUTES } from '/adm/js/config/api.routes.js';
import { getAuthHeaders } from '/adm/js/utils/auth.utils.js';

// Listar todas as obras
export async function getAllWorksApi() {
    try {
        const response = await fetch(API_ROUTES.WORKS);
        const data = await response.json();

        return {
            data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        throw new Error('Erro ao buscar obras');
    }
}

// Buscar detalhes de uma obra
export async function getWorkDetailsApi(workId) {
    try {
        const response = await fetch(API_ROUTES.WORK_DETAILS(workId));
        const data = await response.json();

        return {
            data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        throw new Error('Erro ao buscar detalhes da obra');
    }
}

// Criar nova obra
export async function createWorkApi(workData) {
    try {
        const response = await fetch(API_ROUTES.CREATE_WORK, {
            method: "POST",
            body: JSON.stringify(workData)
        });

        const data = await response.json();

        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        throw new Error('Erro ao criar obra');
    }
}

// Atualizar obra existente
export async function updateWorkApi(workId, updateData) {
    try {
        const response = await fetch(API_ROUTES.UPDATE_WORK(workId), {
            method: "PATCH",
            body: JSON.stringify(updateData)
        });

        const data = await response.json();

        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        throw new Error('Erro ao atualizar obra');
    }
}

// Deletar obra
export async function deleteWorkApi(workId) {
    try {
        const response = await fetch(API_ROUTES.DELETE_WORK(workId), {
            method: "DELETE",
            headers: getAuthHeaders()
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = { message: "Obra deletada com sucesso." };
        }

        return {
            ...data,
            ok: response.ok,
            status: response.status
        };
    } catch (err) {
        throw new Error('Erro ao deletar obra');
    }
}