let currentQuestion = 0;
const questions = [
	"Giữa tháng 2 anh về tới VN rồi, em đón anh được không?",
	"Đón xong em có muốn đi ăn ở đâu không?",
	"Em có muốn đi đâu nữa hok?"
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
		alert("Năn nỉ trả lời màaaaa 🥺");
		return;
	}

	// Store the answer
	answers.push(answer);

	if (answers[0].toLowerCase().includes("không") || 
		answers[0].toLowerCase().includes("ko") ||
		answers[0].toLowerCase().includes("chưa") || 
		answers[0].toLowerCase().includes("0") || 
		answers[0].toLowerCase().includes("bận")) {
		const answerContainer = document.getElementById('answer-container');
		answerContainer.innerHTML = `
            	<p>Thôi không sao</p>
				<p>Cám ơn bé nhiều nhen</p>
				<p>🥰</p>
            `;
		document.getElementById('question-container').style.display = 'none';
		progressBar.style.display = 'block';
		progressBar.style.width = '100%';
		sendEmail();
	}
	else {
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

}

// Display the answers after all questions are answered
function displayAnswers() {
	const answerContainer = document.getElementById('answer-container');
	answerContainer.innerHTML = `
            	<p>Okie ❤️</p>
				<p>Hẹn gặp bé sau nhen</p>
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
    const data = { answers };

    fetch("https://script.google.com/macros/s/AKfycbyppWep9Jd2XHoobfAJ2YsHvOhG-l2zXhtC09GqDS71vVp70esOjvPGQwNBGkzkZLz2eA/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors", // Add this line to bypass CORS
    })
        .then(() => {
            alert("Cám ơn bé đã dành thời gian trả lời nhen! 🥰");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("There was an error sending your answers.");
        });
}

// Detect Enter key press
document.getElementById('answer').addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent unwanted form submission
		nextQuestion(); // Trigger the next question on Enter key press
	}
});

// Initialize the quiz when the page is fully loaded
window.onload = function() {
	setTimeout(showQuiz, 1500); // Show the quiz after 2 seconds
};