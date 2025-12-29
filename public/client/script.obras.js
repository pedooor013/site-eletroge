const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarDetalhes(id) {
    try {
        const resposta = await fetch(`/eletroge/obras/detalhes/${id}`);

        if (resposta.status === 200) {
            const dados = await resposta.json();
            console.log('Dados recebidos:', dados); // para debug
            montarTela(dados[0]);
        } else {
            console.error('Erro na resposta:', resposta.status);
        }
    } catch (err) {
        console.error('Erro ao carregar detalhes:', err);
    }
}

function montarTela(dados) {
    const detalhes = document.getElementById('section-obras');

    if (!detalhes) {
        console.error('Elemento section-obras não encontrado');
        return;
    }

    // Validar dados
    if (!dados) {
        console.error('Dados não recebidos');
        return;
    }

    // --- CORRIGIR FORMATO DAS IMAGENS ---
    const imagens = dados.imagens || [];
    const imagensProcessadas = imagens.map(img => {
        try {
            return JSON.parse(img).url;
        } catch {
            return img.url ? img.url : img;
        }
    });

    // imagem principal
    const imagemPrincipal = imagensProcessadas.length > 0 ? imagensProcessadas[0] : "";

    // montar thumbnails
    let thumbnailsHTML = "";
    imagensProcessadas.forEach((img, i) => {
        if (i !== 0) {
            thumbnailsHTML += `<img src="${img}" class="thumbnail-img-obras">`;
        }
    });

    // montar serviços
    let servicosHTML = "";
    const servicos = dados.servicos || [];
    servicos.forEach(serv => {
        servicosHTML += `<li>${serv.nome} ${serv.descricao}</li>`;
    });

    detalhes.innerHTML = `
        <h2 id="h2-nome-obra">${dados.nome || 'Sem título'}</h2>
        <hr />  
        <div id="content-obras">
            <div id="images-obras-container">

                <div id="thumbnail-images-obras">
                    ${thumbnailsHTML}
                </div>
                
                <div id="main-image-container">
                    <img src="${imagemPrincipal}" class="main-image-obras">
                </div>

            </div>

            <div id="description-obras">
                <progress value="${dados.progresso || 0}" max="100"></progress>
                <div id="tag-obras">
                    <ul>${servicosHTML}</ul>
                </div>
                <p id="span-description-obras">${dados.descricao || ''}</p>
            </div>

        </div>
    `;

    // troca de miniatura pela principal
    const thumbnails = document.querySelectorAll(".thumbnail-img-obras");
    const mainImage = document.querySelector(".main-image-obras");

    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const atual = mainImage.src;
            mainImage.src = thumb.src;
            thumb.src = atual;
        });
    });
}

carregarDetalhes(id);