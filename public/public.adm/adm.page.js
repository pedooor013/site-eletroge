const loginAPIRoute = 'http://localhost:3000/eletroge/login';
const createNewWorkAPIRoute = 'http://localhost:3000/eletroge/cadastrarObra';
const uploadImagesAPIRoute = 'http://localhost:3000/eletroge/upload';

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
        option.textContent = work.nome;
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

async function loadWorkDetails(id) {    
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

    selectedFiles = []; // Reset file input state

    if (!images || images.length === 0) return;

    images.forEach(imgObj => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("preview-wrapper");

        const img = document.createElement("img");
        img.src = imgObj.url;

        wrapper.appendChild(img);
        previewArea.appendChild(wrapper);
    });
}
