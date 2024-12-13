let currentQuestion = 0;
const questions = [
	"Hôm nay em muốn ăn gì?",
	"Em muốn đi ăn lúc mấy giờ?",
	"Ăn xong có đi đâu nữa hok?"
];
const answers = [];
const progressBar = document.getElementById('progress-bar');
progressBar.style.display = 'none';

// Function to show the quiz after the page is loaded
function showQuiz() {
	// Hide the loader and show the quiz container
	document.getElementById('loader').style.display = 'none';
	document.getElementById('quiz-container').style.display = 'block';
	showQuestion();
}

// Show the current question
function showQuestion() {
	const questionElement = document.getElementById('question');
	questionElement.textContent = questions[currentQuestion];
	document.getElementById('answer').value = '';
}

// Handle the user's answer and move to the next question
function nextQuestion() {
	const answer = document.getElementById('answer').value.trim();
	if (answer === "") {
		alert("Please provide an answer.");
		return;
	}

	// Store the answer
	answers.push(answer);

	// Update progress bar
	progressBar.style.display = 'block';
	progressBar.style.width = `${(currentQuestion + 1) * 33.33}%`;

	currentQuestion++;

	// If all questions are answered, show the results
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		displayAnswers();
		sendEmail();
	}
}

// Display the answers after all questions are answered
function displayAnswers() {
	const answerContainer = document.getElementById('answer-container');
	answerContainer.innerHTML = `
            	<p>Okie! Hẹn gặp bé iu lúc <strong>${answers[1]}</strong> nhen ^^</p>
                <!-- 
	                <h3>Your Answers:</h3>
	                <ul>
	                    <li><strong>Hôm nay em muốn ăn gì?</strong> ${answers[0]}</li>
	                    <li><strong>Em muốn đi ăn lúc mấy giờ?</strong> ${answers[1]}</li>
	                    <li><strong>Ăn xong có đi đâu nữa hok?</strong> ${answers[2]}</li>
	                </ul> 
                -->
            `;
	document.getElementById('question-container').style.display = 'none';
}

function sendEmail() {
    const data = { answers: answers };

    fetch("https://script.google.com/macros/s/AKfycbxaMe2JuZi_B6jGHsJNV_Mkq-fTTpcdTDxvu_ydyc6J68XPLzdzqBXFKVey1l5WG7I_/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors", // Add this line to bypass CORS
    })
        .then(() => {
            alert("Cám ơn bé đã dành thời gian trả lời nhen! ^^");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("There was an error sending your answers.");
        });
}

// Initialize the quiz when the page is fully loaded
window.onload = function() {
	setTimeout(showQuiz, 1500); // Show the quiz after 2 seconds
};