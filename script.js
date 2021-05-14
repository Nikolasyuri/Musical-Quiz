// Pegando todos os elementos
const startBtn = document.querySelector(".start-btn button"); 
const infoBox = document.querySelector(".info-box"); 
const sairBtn = infoBox.querySelector(".buttons .quit"); 
const continuarBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");

//Se o botão Iniciar Quiz for clicado
startBtn.onclick = ()=>{
    infoBox.classList.add("acitveInfo"); //Mostra o infoBox
}

//Se o botão Sair for clicado
sairBtn.onclick = ()=>{
    infoBox.classList.remove("acitveInfo"); //Esconde o infoBox
}
//Se o botão Continuar for clicado
continuarBtn.onclick = ()=>{
    infoBox.classList.remove("acitveInfo"); //Esconde o infoBox
    quizBox.classList.add("activeQuiz"); //Mostra o quizBox
    showQuestions();
}

let queCount = 0;

//Pegando perguntas e respostas do array
function showQuestions(){
    const queText = document.querySelector(".que-text")
    let queTag = '<span>'+ questions[0].question +'</span>';
    queText.innerHTML = queTag;
}