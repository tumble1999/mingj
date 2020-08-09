/**
 * Webb Prompt
 * @author Cameron Trow <tumblegamer@gmail.com> 
 */

function stdout(text,level=0) {
	var p = document.createElement("p");
	p.innerText = text;
	switch (level) {
		case 1:
			p.className = "info";
			break;
		case 2:
			p.className = "warn";
			break;
		case 3:
			p.className = "error";
			break;
		default:
			break;
	}

	document.getElementById("stdout")
	.appendChild(p);
}


function stdin(promptText) {
	if(document.getElementById("prompt")) return new Promise((resolve,reject)=>reject);
	var stdinRow = document.createElement("span");
	stdinRow.id = "prompt"
	stdinRow.classList.add("prompt-")

	var prompt = document.createElement("span");
	prompt.textContent = promptText;
	stdinRow.appendChild(prompt);

	var stdin = document.createElement("span");
	stdin.id = "stdin"
	stdin.role = "textbox"
	stdin.contentEditable = true;
	stdinRow.appendChild(stdin);

	document.body.appendChild(stdinRow);

	stdin.focus();

	return new Promise((resolve,reject)=>{
		stdin.addEventListener("keypress",(e)=>{
			if(e.which==13){
				resolve(stdin.textContent);
				document.body.removeChild(stdinRow);
			}
		})

	})
}

document.addEventListener("mousedown",()=>{
	setTimeout(()=>document.getElementById("stdin").focus(),0)
})