fs.dev.stdout.write = (...args) => stdout(args.join(" "))
fs.dev.stderr.write = (...args) => stdout(args.join(" "), 3)

function startDemo() {
	stdin(MGJgetPrompt()).then(input => {
		shell(input);
		setTimeout(startDemo, 0);
	})
}

startDemo();