
const nomes = new Set();
let  sorteados = [];

function adicionar(){
    const nomeElemento = document.getElementById('nomeInput');
    const nome = nomeElemento.value.trim().toUpperCase(); //P1 - O nome deverá ser em letra maiúscula //P2 - Deverá ser retirado os espaços do nomes

    if (nome === '') {
        alert('Por favor, digite um nome!');
        return;
    }
    
    if (nomes.has(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }
    
    nomes.add(nome);
    atualizarParticipantes();
    habilitarSorteio();
    nomeElemento.value = '';
    nomeElemento.focus();
}

function remover(nome) {
    //P3 - O nome deverá ser retirado da coleção do tipo SET  
    nomes.delete(nome);
    atualizarParticipantes();
    habilitarSorteio();
}

function atualizarParticipantes() {
    const participantesDiv = document.getElementById('participantesDiv');
    const participantesQtd = document.getElementById('participantesQtd');
    const excluir = document.getElementById('excluirParticipantes');
    participantesDiv.innerHTML = '';
    participantesQtd.innerText = nomes.size;

    if (nomes.size === 0) {
        excluir.disabled = true;
        return;
    }

    excluir.disabled = false;

    nomes.forEach(nome => {
        const div = document.createElement('div');
        div.className = 'participante';
        div.innerText = nome;

        const btn = document.createElement('button');
        btn.innerText = '❌';
        btn.onclick = () => remover(nome);
        div.appendChild(btn);

        participantesDiv.appendChild(div);
    });
}

function sortear() {
    //P4 - O elemento sorteado deverá ser retirado da coleção SET nomes
    if (nomes.size < 2) {
        alert('É necessário pelo menos 2 participantes para fazer o sorteio!');
        return;
    }

    const resultado = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');

    resultado.innerHTML = '<div class="vazio">Sorteando...</div>';

    setTimeout(() => {
        const participantesArray = Array.from(nomes);
        const randomIndex = Math.floor(Math.random() * participantesArray.length);
        const vencedor = participantesArray[randomIndex];
        nomes.delete(vencedor); //P4
        sorteados.push(vencedor);
        atualizarParticipantes();

        resultado.classList.add('vencedor');

        setTimeout(() => {
            resultado.classList.remove('vencedor');
        }, 1000);
        excluir.style.display = 'inline-block';

        resultado.innerHTML = "";
        for (let sorteado of sorteados){
            resultado.innerHTML += `
                <div class="sorteado-item">
                    ${sorteado}
                </div>`;
        }
    }, 1500);
}

function excluirTodosParticipantes() {
    //P5 - Excluir todos participantes
    nomes.clear();
    atualizarParticipantes();
    habilitarSorteio();
}

function excluirTodosSorteados() {
    //P6 - Excluir todos os sorteados
    sorteados = [];
    const resultado = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');
    resultado.innerHTML = '<div class="vazio">Clique em "Sortear" para ver o resultado!</div>';
    excluir.style.display = 'none';
    atualizarSorteados();
}

function atualizarSorteados() {
    const sorteadosQtd = document.getElementById('sorteadosQtd');
    sorteadosQtd.innerText = sorteados.length;
}

function habilitarSorteio() {
    document.getElementById('sortearButton').disabled = nomes.size === 0;
}
