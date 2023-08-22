// CRIA UMA CONSTANTE CHAMADA "QUESTIONS", QUE ARMAZENA UM ARRAY, ONDE CADA OBJETO DESSE ARRAY REPRESENTA UMA PERGUNTA E SUAS ALTERNATIVAS DE RESPOSTA
const questions = [
    {
        // PROPRIEDADE "QUESTION" QUE CONTÉM UMA STRING QUE REPRESENTA A PERGUNTA
        question: "Qual é a fórmula da água?",
        // PROPRIEDADE QUE CONTÉM UM ARRAY DE STRINGS, COM A FUNÇÃO DE REPRESENTAR CADA ALTERNATIVA DA PERGUNTA
        options: ["CO2", "H2O", "O2", "N2"],
        // PROPRIEDADE QUE DEFINE QUAL É A RESPOSTA CORRETA PARA A PERGUNTA
        correctAnswer: "H2O",
        // PROPRIEDADE QUE DEFINE A IMAGEM QUE SERÁ EXIBIDA DE ACORDO COM A PERGUNTA
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
];

// DECLARA UMA CONSTANTE QUE BUSCA NO HTML UM ELEMENTO CHAMADO '' E O GUARDA NESSA VARIÁVEL, PARA EXIBIR O QUE LHE FOI DETERMINADO
const imageElement = document.querySelector('.imageQuestion');
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const feedbackContainer = document.querySelector(".feedback");

// DECLARA UMA VARIÁVEL PARA MANTER O CONTROLE DA QUESTÃO QUE ESTÁ SENDO EXIBIDA, NO CASO, A PRIMEIRA QUESTÃO (ZERO)
let currentQuestionIndex = 0;

// DECLARA UMA VARIÁVEL "CHANCES", QUE NO CASO, SE RESUMEM A APENAS DUAS
let chances = 2;

// DECLARA UMA VARIÁVEL QUE DEFINE A PONTUAÇÃO, QUE SEMPRE SE INICIA NO ZERO
let score = 0;

// FUNÇÃO PARA CARREGAR E EXIBIR A PERGUNTA NA PÁGINA, PARA SUBSTITUIR O CONTEÚDO DOS ELEMENTOS DO HTML COM AS INFORMAÇÕES CORRETAS
function loadQuestion() {
    
    // SELECIONA A PERGUNTA QUE SERÁ EXIBIDA
    const question = questions[currentQuestionIndex];
    // COLOCA O TEXTO DA PERGUNTA NO ELEMENTO "QUESTION CONTAINER"
    questionContainer.textContent = question.question;
    // COLOCA A IMAGEM DA PERGUNTA NO ELEMENTO "IMAGE ELEMENT"
    imageElement.src = question.image;

    // LIMPA TODAS AS OPÇÕES DE RESPOSTA PARA OUTRAS SEREM CARREGADAS
    optionsContainer.innerHTML = "";

    // LIMPA TODO FEEDBACK QUE HAVIA SIDO FEITO ANTES
    feedbackContainer.textContent = "";

    // PARA CADA ALTERNATIVA DA QUESTÃO
    question.options.forEach((option, index) => {
        // CRIA UM BOTÃO NO HTML, COMO SE FOSSE UM BOTÃO NOVO PARA CADA RESPOSTA
        const button = document.createElement("button");
        // ADICIONA UM ÍCONE E UM TEXTO NO BOTÃO
        button.innerHTML = `
            <i class="${getIconClass(index)}"></i>
            <span>${option}</span>
        `;
        // QUANDO ALGUÉM CLICA NO BOTÃO, VERIFICA SE A RESPOSTA ESTÁ CORRETA OU NÃO
        button.addEventListener("click", () => checkAnswer(index));
        // ADICIONA O BOTÃO COM A RESPOSTA NA TELA, PARA QUE AS PESSOAS CLIQUEM NELE
        optionsContainer.appendChild(button);
    });
}

// FUNÇÃO QUE ATRIBUI ÍCONES AOS BOTÕES DE ALTERNATIVAS
// ESSA FUNÇÃO RECEBE UM "NÚMERO" CHAMADO INDEX (COM A FUNÇÃO DE REPRESENTAR A POSIÇÃO DE UMA OPÇÃO DENTRE AS OPÇÕES)
function getIconClass(index) {
    // VERIFICA O VALOR DO INDEX E EXECUTA O CÓDIGO A PARTIR DO VALOR QUE FOI DENOMINADO
    switch (index) {
        // CASO O INDEX SEJA A PRIMEIRA OPÇÃO (ZERO)
        case 0:
            // RETORNA UMA CLASSE DE ÍCONE "QUADRADO" 
            return "fas fa-square";
        case 1:
            return "fas fa-play";
        case 2:
            return "fas fa-circle";
        case 3:
            return "fas fa-star";
        // SE O INDEX NÃO FOR NENHUM DOS VALORES ACIMA 
        default:
            // RETORNA UMA CLASSE DE ÍCONE "INTERROGAÇÃO"
            return "fas fa-question";
    }
}

// FUNÇÃO QUE RECEBE O ÍNDICE DA ALTERNATIVA QUE O USUÁRIO SELECIONOU
function checkAnswer(selectedIndex) {
    // SELECIONA A PERGUNTA ATUAL COM BASE NAS ALTERNATIVAS DELA 
    const question = questions[currentQuestionIndex];
    // SE A RESPOSTA FOR IGUAL A RESPOSTA CORRETA
    if (question.options[selectedIndex] === question.correctAnswer) {
        // ACRESCENTA 10 PONTOS NA VARIÁVEL "SCORE"
        score += 10;
        // PASSA PARA A PRÓXIMA QUESTÃO, INCREMENTANDO O ÍNDICE DA PERGUNTA QUE ESTÁ SENDO EXIBIDA
        currentQuestionIndex++;
        // SE AINDA HOUVER MAIS PERGUNTAS
        if (currentQuestionIndex < questions.length) {
            // CARREGA A PRÓXIMA PERGUNTA
            loadQuestion();
        // CASO CONTRÁRIO, SE TODAS AS PERGUNTAS FOREM RESPONDIDAS
        } else {
            // MOSTRA O TEXTO "PARABÉNS! QUIZ CONCLUÍDO!"
            questionContainer.textContent = "Parabéns! Quiz concluído!";
            // EXIBE A PONTUAÇÃO NA ÁREA DETERMINADA (OPÇÕES)
            optionsContainer.innerHTML = `<p>Sua pontuação: ${score}</p>`;
        }
    // CASO A RESPOSTA ESTEJA ERRADA 
    } else {
        // AS CHANCES DO USUÁRIO DIMINUEM
        chances--;
        // SE CHANCES FOR IGUAL A ZERO (CHANCES ESGOTADAS)
        if (chances === 0) {
            // MOSTRA O TEXTO "FIM DO QUIZ"
            questionContainer.textContent = "Fim do Quiz";
            // EXIBE A PONTUAÇÃO NA ÁREA DETERMINADA (OPÇÕES)
            optionsContainer.innerHTML = `<p>Sua pontuação: ${score}</p>`;
        // CASO CONTRÁRIO, EXIBE A MENSAGEM "RESPOSTA INCORRETA. TENTE NOVAMENTE", NA ÁREA DE FEEDBACK
        } else {
            feedbackContainer.textContent = "Resposta incorreta. Tente novamente.";
        }
    }
}

// INICIA O QUIZ, OU SEJA, CARREGA A PRIMEIRA PERGUNTA E AS SUAS ALTERNATIVAS NA PÁGINA
loadQuestion();