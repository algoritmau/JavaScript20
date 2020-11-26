const button = document.querySelector('.joke-teller__cta');
const myJoke = 'This is pretty easy to implement!';
let jokeQuestion, jokeAnswer;

async function getJoke() {
  const ENDPOINT =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart';

  try {
    const response = await fetch(ENDPOINT);
    const joke = await response.json();
    jokeQuestion = joke.setup;
    jokeAnswer = joke.delivery;
    console.log(`Q: ${jokeQuestion}\nA. ${jokeAnswer}`);
  } catch (error) {
    console.error(`An error has occurred.\n${error}`);
  }
}

// Speech Synthesis
const synth = window.speechSynthesis;

button.addEventListener('click', readJokeOut);

function readJokeOut() {
  getJoke();

  const jokeQuestionToSpeech = new SpeechSynthesisUtterance(jokeQuestion);
  const jokeAnswerToSpeech = new SpeechSynthesisUtterance(jokeAnswer);

  synth.speak(jokeQuestionToSpeech);

  let timerID = setTimeout(() => '', 5000);
  clearTimeout(timerID);

  synth.speak(jokeAnswerToSpeech);
}

// On load
readJokeOut();
