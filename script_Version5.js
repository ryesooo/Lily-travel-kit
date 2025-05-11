// Array of phrases and corresponding image paths
const exercises = [
  { phrase: "How much does this cost?", image: "images/shopping.jpg" },
  { phrase: "I don't feel good. My stomach hurts.", image: "images/doctor.jpg" },
  { phrase: "Would you mind taking a quick picture for me?", image: "images/camera.jpg" },
  { phrase: "I would like to order pizza.", image: "images/restaurant.jpg" },
  { phrase: "Can I get a small discount?", image: "images/market.jpg" },
];

let currentExercise = 0;

// DOM Elements
const phraseElement = document.getElementById("phrase");
const imageElement = document.getElementById("exercise-image");
const feedbackElement = document.getElementById("feedback-text");
const speakButton = document.getElementById("speak-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

// Initialize the first exercise
function loadExercise(index) {
  const exercise = exercises[index];
  phraseElement.textContent = `"${exercise.phrase}"`;
  imageElement.src = exercise.image;
}

// Speech Recognition Setup
const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.onstart = () => {
  feedbackElement.textContent = "Listening... Please say the phrase!";
};

recognition.onspeechend = () => {
  recognition.stop();
};

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript.toLowerCase();
  const targetPhrase = exercises[currentExercise].phrase.toLowerCase();

  if (spokenText === targetPhrase) {
    feedbackElement.textContent = "Great job! Your pronunciation is perfect!";
  } else {
    feedbackElement.textContent = `You said: "${spokenText}". Try again!`;
  }
};

// Event Listeners
speakButton.addEventListener("click", () => {
  recognition.start();
});

prevButton.addEventListener("click", () => {
  if (currentExercise > 0) {
    currentExercise--;
    loadExercise(currentExercise);
    feedbackElement.textContent = "Click 'Speak' and say the phrase above!";
  }
});

nextButton.addEventListener("click", () => {
  if (currentExercise < exercises.length - 1) {
    currentExercise++;
    loadExercise(currentExercise);
    feedbackElement.textContent = "Click 'Speak' and say the phrase above!";
  }
});

// Load the first exercise
loadExercise(currentExercise);