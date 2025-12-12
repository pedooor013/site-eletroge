const loginAPIRoute = 'http://localhost:3000/eletroge/login';
const createNewWorkAPIRoute = 'http://localhost:3000/eletroge/cadastrarObra';
const uploadImagesAPIRoute = 'http://localhost:3000/eletroge/upload';
let currentWorkImages = [];
let deletedWorkImages = []; 

// ================= LOGIN ============================
async function loginADM() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    try {
        const res = await fetch(loginAPIRoute, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            document.getElementById("message").innerHTML = data.message;
            return;
        }

        localStorage.setItem("token", data.token);
        document.getElementById("message").innerHTML = "Login realizado com sucesso!";

    } catch (err) {
        console.error(err);
        document.getElementById("message").innerHTML = "Erro ao conectar com o servidor";
    }
}

// ================== IMAGENS =========================

async function uploadImages(files) {
    const formData = new FormData();

    for (let f of files) {
        formData.append("imagens", f);
    }

    const response = await fetch(uploadImagesAPIRoute, {
        method: "POST",
        body: formData
    });

    const json = await response.json();
    return json.arrImage;
}

// ================== CRIAR OBRA ======================

async function createNewWork() {
    const workName = document.getElementById('workName').value;
    const workDescription = document.getElementById('workDescription').value;
    const workProgress = document.getElementById('workProgress').value;

    if (workProgress > 100 || workProgress < 0) {
        alert("O progresso deve ser um número entre 0 e 100.");
        return;
    }

    const idService = [];
    document.querySelectorAll('input[name="work-service"]:checked')
        .forEach(cb => idService.push(Number(cb.id)));

    if (selectedFiles.length != 4) {
        alert("Selecione 4 imagens!");
        return;
    }

    const uploadedImages = await uploadImages(selectedFiles);

    const token = localStorage.getItem("token");

    const body = {
        name: workName,
        description: workDescription,
        progress: Number(workProgress),
        arrServicesId: idService,
        arrImage: uploadedImages
    };
    console.json({body})
    try {
        const response = await fetch(createNewWorkAPIRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        console.log("Obra cadastrada:", result);

        if (!response.ok) {
            alert(result.message || "Erro ao cadastrar a obra");
            return;
        }

        alert("Obra cadastrada com sucesso!");

        selectedFiles = [];
        document.getElementById("preview-area").innerHTML = "";
        document.getElementById("send-img-work").value = "";

    } catch (err) {
        console.error("Erro ao cadastrar obra:", err);
    }
}


async function loadWorksIntoSelect() {
    const select = document.getElementById("select-work-to-edit");
    
    const response = await fetch("http://localhost:3000/eletroge/obras");
    const works = await response.json();
    
    works.forEach(work => {
        const option = document.createElement("option");
        option.value = work.id;
        option.textContent = `${work.id} - ${work.nome}`;
        select.appendChild(option);
    });
}

loadWorksIntoSelect();

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const selectedId = document.getElementById("select-work-to-edit").value;
    if (!selectedId) return;
    
    loadWorkDetails(selectedId);
});

let currentWorkId = null;

async function loadWorkDetails(id) {    
    currentWorkId = id;
    const response = await fetch(`http://localhost:3000/eletroge/obras/detalhes/${id}`);    

    console.log({response});

    if (response.status !== 200) {
        alert("Error loading work details");
        return;
    }

    const work = (await response.json())[0]; // API returns array

    console.log("WORK RECEIVED:", work);

    // === SIMPLE FIELDS ===
    document.getElementById("workName").value = work.nome || "";
    document.getElementById("workDescription").value = work.descricao || "";
    document.getElementById("workProgress").value = work.progresso || 0;

    // === SERVICES ===
    checkWorkServices(work.servicos);

    // === IMAGES ===
    renderWorkImages(work.imagens);
}

function checkWorkServices(services) {
    // Reset all checkboxes first
    document.querySelectorAll('input[name="work-service"]').forEach(cb => cb.checked = false);

    if (!services || services.length === 0) return;

    services.forEach(service => {
        const checkbox = document.getElementById(service.id || service.service_id);
        if (checkbox) checkbox.checked = true;
    });
}

function renderWorkImages(images) {
    const previewArea = document.getElementById("preview-area");
    previewArea.innerHTML = "";

    currentWorkImages = images.map(img => ({ id: img.id, url: img.url })); // Salva id da imagem

    currentWorkImages.forEach((imgObj, index) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("preview-wrapper");

        wrapper.innerHTML = `
            <img src="${imgObj.url}" />
            <div class="remove-btn" onclick="removeExistingImage(${index})">×</div>
        `;

        previewArea.appendChild(wrapper);
    });
}

function removeExistingImage(index) {
    deletedWorkImages.push(currentWorkImages[index]); // salva imagens removidas
    currentWorkImages.splice(index, 1);
    renderWorkImages(currentWorkImages);
}


async function updateWork(workId) {
    const token = localStorage.getItem("token");

    const name = document.getElementById('workName').value;
    const description = document.getElementById('workDescription').value;
    const progress = document.getElementById('workProgress').value;

    const selectedServiceIds = [];
    document.querySelectorAll('input[name="work-service"]:checked')
        .forEach(cb => selectedServiceIds.push(Number(cb.id)));

    let uploadedImages = null;
    if (selectedFiles.length > 0) {
        uploadedImages = await uploadImages(selectedFiles);
    }

    const updateBody = {};

    if (name.trim()) updateBody.name = name;
    if (description.trim()) updateBody.description = description;
    if (progress !== "") updateBody.progress = Number(progress);

    updateBody.arrServicesId = selectedServiceIds;
    updateBody.remainingImages = currentWorkImages;   // imagens que ficaram
    updateBody.deletedImages = deletedWorkImages;     // imagens removidas

    if (uploadedImages !== null) {
        updateBody.newImages = uploadedImages;
    }

    if (Object.keys(updateBody).length === 0) {
        alert("Nothing to update!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/eletroge/editarObra/${workId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateBody)
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to update work.");
            return;
        }

        alert("Work successfully updated!");
        location.reload();

    } catch (err) {
        console.error("Error updating work:", err);
    }
}

        let workImages = []; // imagens carregadas do banco

        function renderExistingImages() {
            const previewArea = document.getElementById("preview-area");
            previewArea.innerHTML = ""; // limpa tudo

            workImages.forEach((imgObj, index) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("preview-wrapper");

            wrapper.innerHTML = `
                <img src="${imgObj.url}" />
                <div class="remove-btn" onclick="removeExistingImage(${index})">×</div>
            `;

            previewArea.appendChild(wrapper);
            });
        }

        // Remover imagem existente da obra
        function removeExistingImage(index) {
            workImages.splice(index, 1);
            renderExistingImages(); // renderiza de novo
        }

        function updatePreview() {
            renderExistingImages(); // mantém as imagens do banco no preview

            const previewArea = document.getElementById("preview-area");

            selectedFiles.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("preview-wrapper");

                const img = document.createElement("img");
                img.src = e.target.result;

                const removeBtn = document.createElement("div");
                removeBtn.classList.add("remove-btn");
                removeBtn.innerHTML = "×";
                removeBtn.onclick = () => removeImage(index);

                wrapper.appendChild(img);
                wrapper.appendChild(removeBtn);
                previewArea.appendChild(wrapper);
            };

            reader.readAsDataURL(file);
            });
        }

async function deleteWork(workId) {
    try {
        const response = await fetch(`http://localhost:3000/eletroge/deletarObra/${workId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        try {
            return await response.json();
        } catch {
            window.alert('Obra deletada com sucesso');
            return { message: "Obra deletada com sucesso." };
        }

    } catch (error) {
        console.error("Erro ao deletar obra:", error);
        throw error;
        
    }
}
