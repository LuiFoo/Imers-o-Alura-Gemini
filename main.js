let data;

// Faz uma requisição para o arquivo 'jogadores.json' e espera a resposta em formato JSON
fetch('jogadores.json')
  .then(response => response.json()) // Converte a resposta para JSON
  .then(data => {
    // Agora a variável 'data' contém os dados do JSON
    dados = data; // Atribui os dados do JSON à variável 'dados'
});

// Seleciona o botão de pesquisa
const botaoPesquisar = document.querySelector('.container__pesquisar'); 
const pesquisaNaoEncontrada = document.querySelector('.pesquisanaoencontrada');
let textoSemEscrita = false;

// Define a função que será chamada ao clicar no botão de pesquisa
botaoPesquisar.onclick = pesquisarAtletas;

// Função que é chamada ao clicar no botão de pesquisa
function pesquisarAtletas() {

    // Seleciona o elemento da lista onde os itens serão exibidos
    const listaRepeticao = document.querySelector('.container_lista');

    // Obtém o valor do campo de pesquisa
    const textoPesquisado = document.querySelector('.container__campopesquisa').value;

    // Inicializa uma variável para armazenar o HTML dos itens da lista
    let dadosCompostos = '';

    // Itera sobre o array de dados e cria um HTML para cada item
    dados.forEach((item) => {
        // Cria uma string com o HTML para um item da lista
        const dadoUnico = `
        <li class="lista__item">
            <h2 class="lista__item__titulo">
                <a href="#" class="lista__item__titulo__ancora">${item.nome}</a>
            </h2>
            <div class="lista__item__div">
                <p class="lista__item__div__paragrafo">${item.descricao}</p>
                <a class="lista__item__div__ancora" href="${item.link}" target="_blank">Mais informações</a>
            </div>
        </li>`;

        // Verifica se o nome do item inclui o texto pesquisado (caso insensível a maiúsculas/minúsculas)
        if (item.nome.toLowerCase().includes(textoPesquisado.toLowerCase()) || item.descricao.toLowerCase().includes(textoPesquisado.toLowerCase()) ) {
            if (textoPesquisado != '' && textoPesquisado.length >= 3) {
                dadosCompostos += dadoUnico; // Adiciona o HTML do item à variável de dados compostos
            } else {
                textoSemEscrita = true;
            }
        }
    });

    // Se não houver itens que correspondem à pesquisa, exibe mensagem "Não encontrado"
    if (dadosCompostos == '') {
        if (textoSemEscrita == true) {
            console.log(dadosCompostos.length)
            pesquisaNaoEncontrada.innerHTML = "Verifique o digitado";
            textoSemEscrita = false;
            dadosCompostos = '';
            listaRepeticao.innerHTML = dadosCompostos;
        } else {
            console.log(dadosCompostos.length)
            pesquisaNaoEncontrada.innerHTML = "Não encontrado";
            dadosCompostos = '';
            listaRepeticao.innerHTML = dadosCompostos;
        }

    } else {
        // Exibe os itens que correspondem à pesquisa
        listaRepeticao.innerHTML = dadosCompostos;
        pesquisaNaoEncontrada.innerHTML = ""; // Limpa a mensagem de erro
    }
    
}
