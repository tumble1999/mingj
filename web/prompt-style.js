Bash("su mingj")

var prompts = document.getElementsByClassName("prompt");
for (const prompt of prompts) {
	var text = prompt.textContent;
	prompt.textContent = MGJgetPrompt() + text;
}