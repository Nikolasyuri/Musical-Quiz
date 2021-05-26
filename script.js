// Pegando todos os elementos
const startBtn = document.querySelector(".start-btn button"); 
const infoBox = document.querySelector(".info-box"); 
const sairBtn = infoBox.querySelector(".buttons .quit"); 
const continuarBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const timeCount = quizBox.querySelector(".timer .timer-cou");
const timeLine = quizBox.querySelector("header .timeline");
const optionList = document.querySelector(".option-list");
const allOptions = optionList.children.length;

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
    startTimer(15);
    startTimerLine(0);
    nextBtn.style.display = "none";
}

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

//Se o botão Restart for clicado
restartQuiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    queCount = 0;
    queNumb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
}

//Se o botão Sair for clicado
quitQuiz.onclick = ()=>{
    window.location.reload();
}

//Se o botão Next for clicado
nextBtn.onclick = ()=>{
    if(queCount < questions.length - 1){
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
    }else{
        console.log("Questões Respondidas")
        showResultBox();
    }
}

//Pegando perguntas e respostas do array
function showQuestions(index){
    const queText = document.querySelector(".que-text")
    let queTag = '<span>'+ queNumb + ". " + questions[index].question +'</span>';
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

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Quando uma opção é clicada
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    const allOptions = optionList.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Resposta Correta");
        answer.innerHTML = correctAns + tickIcon;
    }else{
        answer.classList.add("incorrect")
        console.log("Respota Incorreta")
        answer.innerHTML = userAns + crossIcon;

        //Se a respota for incorreta automaticamente mostrar a resposta certa
        for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns)
            optionList.children[i].setAttribute("class", "option correct");       
        }
    }

    //Uma vez selecionada desabilita todas as opções
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
        nextBtn.style.display = "block";
    }
    
}

function showResultBox(){
    infoBox.classList.remove("acitveInfo"); //Esconde o infoBox
    quizBox.classList.remove("activeQuiz"); //Esconde o quizBox
    resultBox.classList.add("activeResult"); //Mostra o resultBox
    const scoreText = resultBox.querySelector(".score-text");
    if(userScore > 3){
        let scoreTag = '<span>Parabéns, você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p> questões.</span>';
        scoreText.innerHTML = scoreTag;
    }else if(userScore > 1){
        let scoreTag = '<span>Infelizmente, você acertou somente <p>'+ userScore +'</p> de <p>'+ questions.length +'</p> questões.</span>';
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = '<span>Infelizmente, você não acertou nenhuma de <p>'+ questions.length +'</p> questões.</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            const allOptions = optionList.children.length;
            let correctAns = questions[queCount].answer;
            for (i = 0; i < allOptions; i++) {
                if(optionList.children[i].textContent == correctAns)
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].classList.add("disabled"); 
                nextBtn.style.display = "block";       
                }
            }
        }   
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 539){
            clearInterval(counterLine);
        }
    }
}
function queCounter(index){
    const bottomQuesCounter = quizBox.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>de<p>'+ questions.length +'</p>Questões</span>';
    bottomQuesCounter.innerHTML = totalQuesCountTag;
}