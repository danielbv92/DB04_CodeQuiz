const startButton = document.getElementById('start-btn')
const welcomeText = document.getElementById('welcome-text')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerDisplay = document.getElementById('timer')
const countdownEl = document.getElementById('countdown');
const startingSeconds = 1;


let time = startingSeconds *60;

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60; 

  countdownEl.innerHTML = '${minutes} '

  
}



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame) 

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  welcomeText.classList.add('hide') // added welcome text to startGame function
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Commonly used data types DO NOT include',
    answers: [
      { text: 'numbers', correct: false },
      { text: 'Booleans', correct: false },
      { text: 'Strings', correct: false },
      { text: 'Alerts', correct: true }
    ]
  },
  {
    question: 'The condition of an if/else statement is enclosed within _____.',
    answers: [
      { text: 'Quotes', correct: false },
      { text: 'Curly Braces', correct: false },
      { text: 'Parenthesis', correct: true },
      { text: 'Square Brackets', correct: false }
    ]
  },
  {
    question: 'Arrays in Javascript can be used to store ______.',
    answers: [
      { text: 'Numbers and Stings', correct: true },
      { text: 'Other Arrays', correct: true },
      { text: 'Booleans', correct: true },
      { text: 'All of the Above', correct: true }
    ]
  },
  {
    question: 'String values must be enclosed within ______ when being assigned to variables',
    answers: [
      { text: 'Commas', correct: false },
      { text: 'Curly Brackets', correct: false },
      { text: 'Quotes', correct: true },
      { text: 'Parenthesis', correct: false }
    ]
  },
  {
    question: 'A very helpful tool used during development and debuging and printing to the debugger is',
    answers: [
      { text: 'Javascript', correct: false },
      { text: 'Terminal/Bash', correct: false },
      { text: 'For Loops', correct: false },
      { text: 'Console log', correct: true }
    ]
  }


]