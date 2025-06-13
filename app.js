function botaoResultado() {
    validarName();
    validarFaltas();
    validarMedia();
    

    const name = document.getElementById("inputname");


    const maxFaltas = document.getElementById('maxFaltas');
    const mediaMin = document.getElementById('mediaMin');
    const inputF = document.getElementById('inputFalta');
    const inputN = document.querySelectorAll('.inputNota');

    const resultado = document.getElementById('resultado');
    

    let soma = 0;

    inputN.forEach(input => {  //A função forEach() percorre cada input da lista.
        soma += (Number(input.value)) || 0; //Number(input.value) converte oq esta no input para numero e logo após / por 4
    }); // || 0 é uma proteção: se o valor for vazio ("") ou inválido, ele usa 0 (evita que NaN entre na conta).


    let media = soma / 4;

    if (media >= (mediaMin.value) && (inputF.value) <= (maxFaltas.value)) {
        setAprovado('APROVADO');
        // document.getElementById('resultado').innerHTML = `O aluno ${name.value} foi APROVADO`
    } else {
        setReprovado('REPROVADO');
    }

    const alunos = [];
    function criaAluno(nome, media) {
        return { nome, media };
    }
    const aluno = criaAluno(name.value, Number(media));
    alunos.push(aluno)
    console.log(alunos)

    function setAprovado(msg) {
        const resultado = document.getElementById('resultado');
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('paragrafo-resultadoAprovado');
        paragrafo.innerHTML = `Aluno ${name.value} ${msg} com ${media.toFixed(2)} de média e ${inputF.value} faltas`;
        resultado.appendChild(paragrafo);
        console.log(paragrafo)
        return (paragrafo);
    }
    function setReprovado(msg) {

        const paragrafo = document.createElement('p');
        paragrafo.classList.add('paragrafo-resultadoReprovado');
        paragrafo.innerHTML = `Aluno ${name.value} ${msg} com ${media.toFixed(2)} de média e ${inputF.value} faltas`;
        resultado.appendChild(paragrafo);
        console.log(paragrafo)
        return (paragrafo);
    }

    limparCampos();
}


function validarName() {
    const validaName = document.getElementById("inputname");

    if (validaName.value.trim() === '') {
        alert("Digite o nome do aluno (-_-)");
        paragrafo.innerHTML = ''
        return;
    }
}
function validarFaltas() {
    const validaFaltas = document.getElementById("maxFaltas");

    if (validaFaltas.value.trim() === '') {
        alert("Digite um número máximo de faltas permitidas xD");
        paragrafo.innerHTML = ''
        return;
    }
}
function validarMedia() {
    const validaMedia = document.getElementById("mediaMin");

    if (validaMedia.value.trim() === '') {
        alert("Digite digite uma média miníma para aprovação :)");
        paragrafo.innerHTML = ''
        return;
    }
}



function limparCampos() {

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.value = ''
    });

}

function limparAlunos() {
    document.getElementById('resultado').textContent = '...'
    alert('Tem certeza que deseja limpar a lista de alunos?')

}
