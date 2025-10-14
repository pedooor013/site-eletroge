const URLDetalheObra = 'http://localhost:3000/eletroge/obras/';

async function refletirDetalhesObrasHTML(obra){
    const container = document.getElementById("main-obras");
    container.innerHTML = "";
    
    obra.forEach((obra) =>{
        const detalhes = document.createElement("section");
        detalhes.classList.add('section-obras');
        detalhes.innerHTML = `
        <h2 id="h2-nome-obra">${obra.nome}</h2>
        <hr />
        <div id="content-obras">
            <div id="images-obras">
            <div id="thumbnail-images-obras">
            <!-- estruturar como deve ser feito -->
            </div>
            <div id="main-image-obras">
                <img src="${obra.imagem}" alt="" />
            </div>
            </div>
            <div id="description-obras">
            <progress value="${obra.progresso}" max="100" placeholder="teste"></progress>
                            
            <div id="tag-obras">
                <!-- <ul>
                <i class="fa-solid fa-plug" style="color: #ffd43b"> </i>
                <h4>Alta Tensão</h4>
                </ul> -->
                ${obra.servicos}
            </div>
            <p id="span-description-obras">
                <!-- descricao da obra -->
            </p>
            </div>
        </div>
        `
    })
    let imagensComplementares;
    

}


async function carregarInformacoesDasObras(id){
    try{
        let obra;
        const resposta = await fetch(`${URLDetalheObra}`);
        if(resposta.status === 200){
            obra = await resposta.json();
            console.log({obra});
        }
    }catch(err){

    }
}