const URLTodasObras = 'http://localhost:3000/eletroge/obras';
const URLDetalheObra = 'http://localhost:3000/eletroge/obras/';

async function carregarCardObras(){
try{
    let obras;
    const resposta = await fetch(URLTodasObras);
    if (resposta.status === 200){
        obras = await resposta.json();
        console.log(obras)
    }

    const container = document.getElementById('quadros-obras');
    container.innerHTML = "";

    obras.forEach((obras) =>{
        const card = document.createElement("div");
        card.classList.add("grade-quadros");
        card.innerHTML = `
        <div class="card-obras">
            <a href="obras.html?id=${obras.id}">
            <div
                class="imagem-bg-obra"
                style="background-image: url('${obras.imagem || "../img/placeholder.jpg"}')">
            </div>
            </a>
            <div class="info-quadros">
            <a href="obras.html">
                <span class="titulo-quadro-obra">${obras.nome}</span>
            </a>

            <p class="desc-quadro-obra">${obras.descricao}</p>
            <a class="action" href="obras.html">
                <p class="p-veja-mais">Veja mais</p>
                <span aria-hidden="true"> → </span>
            </a>
            </div>
        </div>
            `;
        container.appendChild(card);
    });
}catch(err){
    console.log("Erro ao carregar os produtos: " , err);
    }
}


carregarCardObras();