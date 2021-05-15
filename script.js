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
    showQuestions(0);
    queCounter(1);
}

let queCount = 0;
let queNumb = 1;

const nextBtn = quizBox.querySelector(".next-btn");
//Se o botão Next for pressionado
nextBtn.onclick = ()=>{
    if(queCount < questions.length - 1){
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
    }else{
        console.log("Ver Resultado")
    }
}

//Pegando perguntas e respostas do array
function showQuestions(index){
    const queText = document.querySelector(".que-text")
    const optionList = document.querySelector(".option-list")
    let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    console.log(userAns);
}

function queCounter(index){
    const bottomQuesCounter = quizBox.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>de<p>'+ questions.length +'</p>Questões</span>';
    bottomQuesCounter.innerHTML = totalQuesCountTag;
}