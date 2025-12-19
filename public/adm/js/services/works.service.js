import { 
    getAllWorksApi, 
    getWorkDetailsApi, 
    createWorkApi, 
    updateWorkApi,
    deleteWorkApi 
} from '../api/works.api.js';

// Listar todas as obras
export async function getAllWorksService() {
    try {
        const result = await getAllWorksApi();

        if (!result.ok) {
            throw new Error('Erro ao buscar obras');
        }

        return result.data;
    } catch (err) {
        console.error("Erro no serviço de obras:", err);
        throw err;
    }
}

// Buscar detalhes de uma obra específica
export async function getWorkDetailsService(workId) {
    try {
        const result = await getWorkDetailsApi(workId);

        if (!result.ok) {
            throw new Error('Erro ao buscar detalhes da obra');
        }

        // A API retorna um array, pegamos o primeiro item
        return result.data[0];
    } catch (err) {
        console.error("Erro no serviço de detalhes da obra:", err);
        throw err;
    }
}

// Criar nova obra
export async function createWorkService(workData) {
    try {
        // Validação do progresso
        if (workData.progress > 100 || workData.progress < 0) {
            throw new Error("O progresso deve ser um número entre 0 e 100");
        }

        const result = await createWorkApi(workData);

        if (!result.ok) {
            throw new Error(result.message || "Erro ao cadastrar a obra");
        }

        return {
            success: true,
            message: "Obra cadastrada com sucesso!",
            data: result
        };
    } catch (err) {
        console.error("Erro ao criar obra:", err);
        throw err;
    }
}

// Atualizar obra existente
export async function updateWorkService(workId, updateData) {
    try {
        const result = await updateWorkApi(workId, updateData);

        if (!result.ok) {
            throw new Error(result.message || "Erro ao atualizar obra");
        }

        return {
            success: true,
            message: "Obra atualizada com sucesso!",
            data: result
        };
    } catch (err) {
        console.error("Erro ao atualizar obra:", err);
        throw err;
    }
}

// Deletar obra
export async function deleteWorkService(workId) {
    try {
        const result = await deleteWorkApi(workId);

        if (!result.ok) {
            throw new Error(result.message || "Erro ao deletar obra");
        }

        return {
            success: true,
            message: "Obra deletada com sucesso!",
            data: result
        };
    } catch (err) {
        console.error("Erro ao deletar obra:", err);
        throw err;
    }
}