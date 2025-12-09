const params = new URLSearchParams(window.location.search);
const id = params.get("id");


async function carregarDetalhes(id) {
    try{
        const resposta = await fetch(`http://localhost:3000/eletroge/obras/detalhes/${id}`);

        if(resposta.status === 200){
            const dados = await resposta.json();
            montarTela(dados[0]);
        }
    }catch(err){
        console.error("Erro ao carregar os detalhes: ", err);
    }
}

function montarTela(dados) {
    const detalhes = document.getElementById('section-obras');

    // --- CORRIGIR FORMATO DAS IMAGENS ---
    dados.imagens = dados.imagens.map(img => {
        try {
            return JSON.parse(img).url; // pega a URL de dentro do JSON string
        } catch {
            return img.url ? img.url : img; // fallback
        }
    });

    // imagem principal
    const imagemPrincipal = dados.imagens.length > 0 ? dados.imagens[0] : "";

    // montar thumbnails
    let thumbnailsHTML = "";
    dados.imagens.forEach((img, i) => {
        if (i !== 0) {
            thumbnailsHTML += `<img src="${img}" id="thumbnail-images-obras">`;
        }
    });

    // montar serviços
    let servicosHTML = "";
    dados.servicos.forEach(serv => {
        servicosHTML += `<ol>${serv.nome} ${serv.descricao}</ol>`;
    });

    detalhes.innerHTML = `
        <h2 id="h2-nome-obra">${dados.nome}</h2>
        <hr />  
        <div id="content-obras">
            <div id="images-obras">

                <div id="thumbnail-images-obras">
                    ${thumbnailsHTML}
                </div>
                
                <div id="main-image-obras">
                    <img src="${imagemPrincipal}" id="main-image-obras">
                </div>

            </div>

            <div id="description-obras">
                <progress value="${dados.progresso}" max="100"></progress>
                <div id="tag-obras">
                    <ul>${servicosHTML}</ul>
                </div>
                <p id="span-description-obras">${dados.descricao}</p>
            </div>

        </div>
    `;

    // troca de miniatura pela principal
    const thumbnails = document.querySelectorAll("#thumbnail-images-obras img");
    const mainImage = document.querySelector("#main-image-obras img");

    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const atual = mainImage.src;
            mainImage.src = thumb.src;
            thumb.src = atual;
        });
    });
}




carregarDetalhes(id);