const alunos = []; 

function botaoResultado() {
    // 1. Interrompe a função se qualquer validação falhar
    if (!validarName() || !validarFaltas() || !validarMedia()) {
        return; 
    }
    
    const name = document.getElementById("inputname");
    const maxFaltas = document.getElementById('maxFaltas');
    const mediaMin = document.getElementById('mediaMin');
    const inputF = document.getElementById('inputFalta');
    const inputN = document.querySelectorAll('.inputNota');

    const resultado = document.getElementById('resultado');

    let soma = 0;

    inputN.forEach(input => {
        soma += (Number(input.value)) || 0;
    });

    let media = soma / 4;
    let paragrafoResultado; 

    // Garante que a comparação seja entre números, caso contrário a mediaMin.value é uma string
    if (media >= (Number(mediaMin.value)) && (Number(inputF.value)) <= (Number(maxFaltas.value))) {
        paragrafoResultado = setAprovado('APROVADO');
    } else {
        paragrafoResultado = setReprovado('REPROVADO');
        resultado.appendChild(paragrafoResultado);
    }

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
        return paragrafo;
    }
    
    function setReprovado(msg) {
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('paragrafo-resultadoReprovado');
        paragrafo.innerHTML = `Aluno ${name.value} ${msg} com ${media.toFixed(2)} de média e ${inputF.value} faltas`;
        console.log(paragrafo)
        return paragrafo;
    }

    limparCampos();
}

// =================================================================
// FUNÇÕES DE VALIDAÇÃO CORRIGIDAS
// Agora elas retornam 'false' em caso de erro para parar a execução.
// =================================================================

function validarName() {
    const validaName = document.getElementById("inputname");
    const nome = validaName.value.trim();

    if (nome === '') {
        alert("Digite o nome do aluno (-_-)");
        return false; // Falhou na validação
    }

    // Verifica se o nome contém algum número
    if (/\d/.test(nome)) {
        alert("O nome do aluno não pode conter números!");
        validaName.value = ''; 
        return false; // Falhou na validação
    }
    
    return true; // Sucesso na validação
}

function validarFaltas() {
    const validaFaltas = document.getElementById("maxFaltas");

    if (validaFaltas.value.trim() === '') {
        alert("Digite um número máximo de faltas permitidas xD");
        return false; // Falhou na validação
    }
    
    return true; // Sucesso na validação
}

function validarMedia() {
    const validaMedia = document.getElementById("mediaMin");

    if (validaMedia.value.trim() === '') {
        alert("Digite digite uma média miníma para aprovação :)");
        return false; // Falhou na validação
    }
    
    return true; // Sucesso na validação
}

// =================================================================
// O restante do código (gerarPDF, limparCampos, limparAlunos)
// =================================================================

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;
    
    doc.setFontSize(18);
    doc.text("Relatório de Aprovação de Alunos", 10, y);
    y += 10; 
    
    doc.setFontSize(12);

    const resultados = document.getElementById('resultado').querySelectorAll('p');

    if (resultados.length === 0) {
        alert("Não há alunos lançados para gerar o PDF.");
        return;
    }

    resultados.forEach((paragrafo) => {
        const textoAluno = paragrafo.textContent || paragrafo.innerText;
        
        if (y > 280) { 
            doc.addPage();
            y = 10; 
        }

        doc.text(textoAluno, 10, y);
        y += 7; 
    });
    
    doc.save("Relatorio_Alunos.pdf");
}

function limparCampos() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''
    });
}

function limparAlunos() {
    document.getElementById('resultado').textContent = ' '
}
