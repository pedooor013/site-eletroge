const params = new URLSearchParams(window.location.search);
const id = params.get("id");


async function carregarDetalhes(id) {
    try{
        const resposta = await fetch(`http://localhost:3000/eletroge/obras/detalhes/${id}`);

        if(resposta.status === 200){
            const dados = await resposta.json();
            console.log("Detalhes:", dados);
            montarTela(dados[0]);
        }
    }catch(err){
        console.error("Erro ao carregar os detalhes: ", err);
    }
}

function montarTela(dados){
    document.getElementById("titulo-obra").innerHTML = dados.nome;
    document.getElementById("descricao-obra").innerHTML = dados.descricao;

    const divImgs = document.getElementById("lista-imagens");
    dados.imagens.forEach(url =>{
        divImgs.innerHTML += `<img src="${url}" class="img-detalhe">`;
    });

    const divServicos = document.getElementById("lista-servicos");
    dados.servicos.forEach(serv =>{
        divServicos.innerHTML += `<ul>${serv.nome   } - ${serv.descricao}</ul>`
    });
}

carregarDetalhes(id);