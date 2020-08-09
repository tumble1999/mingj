var prompts = document.getElementsByClassName("prompt");
for (const prompt of prompts) {
	var text = prompt.textContent;
	if(prompt.classList.contains("hostname")) {
		prompt.textContent = MGJgetPrompt() + text;

	} else {
	prompt.textContent = "$ " + text;
	}

	if(prompt.classList.contains("404")) {
		prompt.textContent = prompt.textContent.replace("PATH",location.pathname);
	}
}

var p404 = document.getElementsByClassName("404");
for (const p of p404) {
	if(p.classList.contains("404")) {
		p.textContent = p.textContent.replace("PATH",location.pathname);
	}
}