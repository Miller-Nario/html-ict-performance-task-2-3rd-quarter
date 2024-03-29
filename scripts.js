const quizData = [
  {
    question: 'What is the largest structure known to mankind?',
    options: ['Petronius Platform', 'Merdeka 118', 'Tokyo Skytree', 'Burj Khalifa'],
    answer: 'Burj Khalifa',
  },
  {
    question: 'What made The Russian Empire collapse?',
    options: [
       'Economic and Social Issues', 
       'Rise of Revolutionary Leftism',
       'The Collapse of Authority',
       'All of the Options'
    ],
    answer: 'All of the Options',
  },
  {
    question: 'Which of these cities are called "The 2nd Most Destroyed City in World War 2?',
    options: ['Nagasaki', 'Berlin', 'Warsaw', 'Manila'],
    answer: 'Manila',
  },
  {
    question: 'How many times did Germany won wars?',
    options: ['0', '10', '13', '5'],
    answer: '13',
  },
  {
    question: 'Which country defeated France in the Napoleonic Wars?',
    options: [
      'Prussia(Germany)',
      'Russian Empire',
      'Swedish Empire',
      'British Empire',
      'Kingdom of Spain',
      'Austrian Empire',
      'All of the Options'
    ],
    answer: 'All of the Options',
  },
  {
    question: 'What anime won the 2024 Anime of the year Award?',
    options: ['Jujutsu Kaisen', 'My Hero Academia', 'Demon Slayer', 'Oshi No Ko'],
    answer: 'Jujutsu Kaisen',
  },
  {
    question: 'Who Killed Portgas D. Ace?',
    options: [
      'Marine Admiral Akainu',
      'Marshall D. Teach',
      'Monkey D. Garp',
      'Pirate Hunter Roronoa Zoro',
    ],
    answer: 'Marine Admiral Akainu',
  },
  {
    question: 'Which year did One Piece get Created?',
    options: ['1895', '1900', '1919', '1990', 'None of the Options'],
    answer: 'None of the Options',
  },
  {
    question: 'Did One Piece end?',
    options: [
      'No',
      'Yes',
      'Yeah',
      'That\'s right',
    ],
    answer: 'No',
  },
  {
    question: 'Which pirate was known as the King of the Pirates?',
    options: ['Gol D. Roger', 'Monkey D. Dragon', 'Rob Lucci', 'Monkey D. Luffy'],
    answer: 'Gol D. Roger',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
