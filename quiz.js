const questions = [
    {
        question: "Qual é a fórmula da água?",
        options: ["CO2", "H2O", "O2", "N2"],
        correctAnswer: "H2O",
        image: "water.png"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Marte", "Júpiter", "Vênus"],
        correctAnswer: "Júpiter",
        image: "solarSystem.png"
    },
    {
        question: "Quem escreveu a peça 'Romeu e Julieta'?",
        options: ["M. de Cervantes", "Jane Austen", "Charles Dickens", "W. Shakespeare"],
        correctAnswer: "W. Shakespeare",
        image: "romeuJulieta.png"
    },
    {
        question: "Qual é o maior osso do corpo humano?",
        options: ["Fêmur", "Tíbia", "Crânio", "Úmero"],
        correctAnswer: "Fêmur",
        image: "bone.png"
    },
    {
        question: "Qual organela é conhecida como a 'usina de energia' da célula?",
        options: ["Lisossomo", "Cloroplasto", "Mitocôndria", "Núcleo"],
        correctAnswer: "Mitocôndria",
        image: "mitochondria.png"
    }
    // Adicione mais perguntas aqui
];

const imageElement = document.querySelector('.imageQuestion')
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const feedbackContainer = document.querySelector(".feedback");

let currentQuestionIndex = 0;
let chances = 2;
let score = 0;

function loadQuestion() {
    

    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    imageElement.src = question.image;

    optionsContainer.innerHTML = "";

    // question.options.forEach((option, index) => {
    //     const button = document.createElement("button");
    //     button.textContent = option;
    //     button.addEventListener("click", () => checkAnswer(index));
    //     optionsContainer.appendChild(button);
    // });

    feedbackContainer.textContent = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = `
            <i class="${getIconClass(index)}"></i>
            <span>${option}</span>
        `;
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function getIconClass(index) {
    switch (index) {
        case 0:
            return "fas fa-square";
        case 1:
            return "fas fa-play";
        case 2:
            return "fas fa-circle";
        case 3:
            return "fas fa-star";
        default:
            return "fas fa-question";
    }
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (question.options[selectedIndex] === question.correctAnswer) {
        score += 10;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            questionContainer.textContent = "Parabéns! Quiz concluído!";
            optionsContainer.innerHTML = `<p>Sua pontuação: ${score}</p>`;
        }
    } else {
        chances--;
        if (chances === 0) {
            questionContainer.textContent = "Fim do Quiz";
            optionsContainer.innerHTML = `<p>Sua pontuação: ${score}</p>`;
        } else {
            feedbackContainer.textContent = "Resposta incorreta. Tente novamente.";
        }
    }
}

loadQuestion();