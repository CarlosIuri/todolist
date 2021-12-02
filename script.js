const btnAdd = document.querySelector(".btnAdd")
const tarefas = document.querySelector(".tarefas")
const campoTexto = document.querySelector(".campoTarefa")
const btnRemover = document.querySelector(".btnRemover")

function getBanco(){
    return JSON.parse(localStorage.getItem('tarefas')) ?? []
}

function setBanco(bancoDados){
    localStorage.setItem("tarefas", JSON.stringify(bancoDados))
}

function verificarTecla(e){
    if(e.key === "Enter"){
        criarTarefa()
    }
}

function criarTarefa(){
    const textoFormatado = campoTexto.value.trim()
    const textoFormatado2 = removeTags(textoFormatado)
    if(textoFormatado2 === ""){
        alert ("Favor, preencher o campo")
        campoTexto.value = ""
        
    }else {
        const bancoDados = getBanco()
        bancoDados.push({"tarefa": textoFormatado2, "checked": false })
        setBanco(bancoDados)
        atualizarTela()
        campoTexto.value = ""
        campoTexto.focus()
}
}

function criarClasse(divNova, p, iconDelete){
    divNova.classList.add("conteudo-tarefa")
    p.classList.add("texto-tarefa")
    iconDelete.classList.add("far", "fa-times-circle", "icon")
}


function atualizarTela(){
    limparTarefas()
    const banco = getBanco()
    banco.forEach((tarefa, index) => {
        const tarefaFiltrada = removeTags(tarefa.tarefa)
        const divNova = document.createElement("div")
        const checkbox = document.createElement('input')
        const label = document.createElement("label")
        const iconDelete = document.createElement("i")
        label.innerHTML = tarefaFiltrada
        label.setAttribute("for", label.innerHTML)
        checkbox.type = "checkbox"
        checkbox.name = label.innerHTML
        checkbox.id = label.innerHTML
        checkbox.checked = tarefa.checked
        divNova.dataset.index = index
        criarClasse(divNova, label, iconDelete, checkbox)
        addBody(divNova, label, iconDelete, checkbox)
    })
}

function addBody(divNova, label, iconDelete, checkbox){
    divNova.appendChild(checkbox)
    divNova.appendChild(label)
    divNova.appendChild(iconDelete)  
    tarefas.appendChild(divNova)  
}

function limparTarefas(){
    while(tarefas.firstChild){
        tarefas.removeChild(tarefas.lastChild)
    }
}

function atualizarValorCheckBox(e){
    if(e.target.matches("[type=checkbox]")){
        banco = getBanco()
        banco[e.target.parentElement.dataset.index].checked = e.target.checked
        setBanco(banco)
        permitirBotaoDeletar()
        }
    }

    function permitirBotaoDeletar(){
        btnRemover.disabled = true
        banco = getBanco()
        const existeCampoChecado = banco.some(t => t.checked)
        if(existeCampoChecado){
            btnRemover.disabled = false
        }
        }

    function removerVariasTarefas(e){
        banco = getBanco()
        const tarefasRemovidas = banco.filter(tarefa => tarefa.checked !== true)
        setBanco(tarefasRemovidas)
        atualizarTela()
        permitirBotaoDeletar()
    }

    function removerTarefa(e){
    if(e.target.matches("i")){
        banco = getBanco() 
        banco.splice(e.target.parentElement.dataset.index, 1)
        setBanco(banco)
        atualizarTela()
        }
    }

    function removeTags(string){
        return string.replace(/<[^>]*>/g, ' ')
                     .replace(/\s{2,}/g, ' ')
                     .trim();
      }

atualizarTela()
permitirBotaoDeletar()

btnAdd.addEventListener("click", criarTarefa)
campoTexto.addEventListener("keypress", verificarTecla)
document.addEventListener("click", removerTarefa)
document.addEventListener("change", atualizarValorCheckBox)
btnRemover.addEventListener("click", removerVariasTarefas)