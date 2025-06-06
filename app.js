function botaoResultado(){
    const name = document.getElementById("inputname").value;
    const maxFaltas = document.getElementById('maxFaltas');
    const mediaMin = document.getElementById('mediaMin');
    const inputF = document.getElementById('inputFalta');
    const inputN = document.querySelectorAll('.inputNota');
    let soma = 0;

    inputN.forEach(input => {  //A função forEach() percorre cada input da lista.
        soma += (Number(input.value)) || 0; //Number(input.value) converte oq esta no input para numero e logo após / por 4
    }); // || 0 é uma proteção: se o valor for vazio ("") ou inválido, ele usa 0 (evita que NaN entre na conta).

    let media = soma/4

    if(media >= Number(mediaMin.value) && Number(inputF.value) <= Number(maxFaltas.value) ){
        document.getElementById('resultado').innerHTML = `O aluno ${name} foi APROVADO`
    }else{
        document.getElementById('resultado').innerHTML = `O aluno ${name} foi REPROVADO"`
    }
}

function limpar(){
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.value = ''
    });
    document.getElementById('resultado').textContent = '...'
}
