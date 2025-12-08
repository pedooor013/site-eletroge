const loginAPIRoute = 'http://localhost:3000/eletroge/login';
const createNewWorkAPIRoute = 'http://localhost:3000/eletroge/cadastrarObra';
const uploadImagesAPIRoute = 'http://localhost:3000/eletroge/upload';

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

let uploadedImages = []; 

document.getElementById("send-img-work").addEventListener("change", async function () {
    const files = this.files;
    uploadedImages = await uploadImages(files);
});

async function uploadImages(files) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("imagens", files[i]);
    }

    try {
        const response = await fetch(uploadImagesAPIRoute, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("Imagens enviadas:", result);

        return result.imagens || []; 

    } catch (err) {
        console.error("Erro no upload: ", err);
    }
}

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

    if (uploadedImages.length === 0) {
        alert("Envie ao menos uma imagem!");
        return;
    }

    const token = localStorage.getItem("token");

    const body = {
        name: workName,
        description: workDescription,
        progress: Number(workProgress),
        arrServicesId: idService,
        arrImage: uploadedImages
    };

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

    } catch (err) {
        console.error("Erro ao cadastrar obra:", err);
    }
}
