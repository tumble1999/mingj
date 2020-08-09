var prompts = document.getElementsByClassName("prompt");
for (const prompt of prompts) {
	var text = prompt.textContent;
	if(prompt.classList.contains("hostname")) {
		prompt.textContent = MGJgetPrompt() + text;

	} else {
	prompt.textContent = "$ " + text;
	}
}