const btnAdd = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ultarefa = document.querySelector('.app__section-task-list');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) ?? [];
const btnCan = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoveConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefaSelecioanda = null;
let liTarefaSelecioanda = null;
function limparForm() {
    textArea.value = '';
    formAddTask.classList.add('hidden');
}
function atualizarTask() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.onclick = () => {
        const novaDescricao =  prompt("Qual é o novo Nome da tarefa ??")

        if (novaDescricao !== ''){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
        }

        atualizarTask();
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');

    botao.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(
                elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                }
            )

            if (tarefaSelecioanda === tarefa) {
                paragrafoDescTarefa.textContent = '';
                tarefaSelecioanda = null;
                liTarefaSelecioanda = null;
                return
            }
            tarefaSelecioanda = tarefa;
            liTarefaSelecioanda = li;
            paragrafoDescTarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li;
}

btnCan.addEventListener('click',() => limparForm());

btnAdd.addEventListener('click', () => {
    //se tem tira se não tem coloca, alterancia da classe noCSS
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();

    const tarefa = {
        descricao: textArea.value
    };

    tarefas.push(tarefa);
    ultarefa.append(criarElementoTarefa(tarefa));
    atualizarTask();
    limparForm();
})

tarefas.forEach(tarefa => {
    const elementTarefa = criarElementoTarefa(tarefa);

    ultarefa.append(elementTarefa);
})

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecioanda && liTarefaSelecioanda) {
        liTarefaSelecioanda.classList.remove('app__section-task-list-item-active')
        liTarefaSelecioanda.classList.add('app__section-task-list-item-complete')
        liTarefaSelecioanda.querySelectorAll('button').setAttribute('disabled', 'disabled')
        tarefaSelecioanda.completa = true;
        atualizarTask()
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"

    if (somenteCompletas)
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })

    tarefas = somenteCompletas ? tarefas.filter(elmento => !elmento.completa) : []
    atualizarTask()
}

btnRemoveConcluidas.onclick = ()=> removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);