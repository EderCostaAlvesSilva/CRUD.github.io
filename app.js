'use strict'

//banco p/ add 
let banco = localStorage.getItem('bd_Cliente'); //me da return do localstorage
banco = JSON.parse(banco);

//tipo de operação A=> adicionar; E => editar;
let operação = "A";
let num_d_indice ;
if(banco == null){
    banco = [];
} 

//abrir e fechar modal
const openModal = () =>{
    document.getElementById('modal').classList.toggle('active');
}

const openModal2 = () =>{
    document.getElementById('modal2').classList.toggle('active');
}

const modalClose = () =>{
    document.getElementById('modal').classList.remove('active')
}
const modalClose2 = () =>{
    document.getElementById('modal2').classList.remove('active')
}
//fim 


const Adcionar = () => {
    
    let Nome = document.getElementById('nome');
    let Email = document.getElementById('email');
    let Celular = document.getElementById('celular');
    let Cidade = document.getElementById('cidade');
    
    if(operação == 'A'){
        let cliente = JSON.stringify({
            nome: Nome.value,
            email: Email.value,
            celular: Celular.value,
            cidade: Cidade.value
        })
    
        banco.push(cliente);
    
        localStorage.setItem('bd_Cliente', JSON.stringify(banco));
    
        Nome.value = ''
        Email.value = ''
        Celular.value = ''
        Cidade.value = ''
    
        listar()
        modalClose();
        
    } else{
        banco.splice(num_d_indice, 1)
        
        let cliente = JSON.stringify({
            nome: Nome.value,
            email: Email.value,
            celular: Celular.value,
            cidade: Cidade.value
        })
    
        banco.push(cliente);
    
        localStorage.setItem('bd_Cliente', JSON.stringify(banco));
    
        Nome.value = ''
        Email.value = ''
        Celular.value = ''
        Cidade.value = ''
    
        listar()
        modalClose();
    }
    operação = 'A'
    console.log('operacao atual: '+ operação)
}

const listar = () => {
    document.querySelector('tbody').innerHTML = '';
    
    let Cont = 0;

    banco.forEach((e,i) => {
        let tr = document.createElement('tr');

        var cliente = JSON.parse(banco[i]);

        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button value="${Cont}" onclick="editar(${Cont})" class="button green editar">Editar</button>

                <button value="${Cont}" onclick="conferir_exclusao(${Cont})" class="button blue excluir">Excluir</button>
            </td>
        `
        document.querySelector('tbody').appendChild(tr)
        Cont++
    });
    console.log(operação)
}

const editar = (numero) => {
    openModal();
    operação = 'E';
    let indice = document.querySelectorAll('.editar'); 
    
    /*indice.forEach((e)=> {
        if(e.value == numero){
            console.log('excluir o btn numero '+numero)
        }
    });*/

    let cliente = JSON.parse(banco[numero])

    let Nome = document.getElementById('nome');
    let Email = document.getElementById('email');
    let Celular = document.getElementById('celular');
    let Cidade = document.getElementById('cidade');

    Nome.value = cliente.nome;
    Email.value = cliente.email;
    Celular.value = cliente.celular;
    Cidade.value = cliente.cidade;
    
    num_d_indice = numero
    console.log('operacao atual: '+ operação);
    console.log(numero)
}
    
const conferir_exclusao = (numero) => {
    openModal2()

    num_d_indice = numero;

    var cliente = JSON.parse(banco[numero]);
    
    document.getElementById('avisoDelete').innerHTML = `Deseja realmente excluir o cliente ${cliente.nome}?`
}

const apagar = () => {
    banco.splice(num_d_indice, 1);

    modalClose2();
    listar();
}

//evento
document.getElementById('btnCadastrar').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', modalClose);
document.getElementById('cancelar').addEventListener('click', modalClose);

document.getElementById('modalClose2').addEventListener('click', modalClose2);
document.getElementById('cancelar2').addEventListener('click', modalClose2);

document.getElementById('salvar').addEventListener('click', Adcionar)
document.getElementById('apagar').addEventListener('click', apagar)

document.querySelector('body').addEventListener('load', listar())
