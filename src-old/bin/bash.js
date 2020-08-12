

function MGJgetPrompt() {
	console.warn("MGJgetPrompt() has deprecated in favor of sys.getprompt()")
	return MinGJ.getprompt();
}

function MGJWhereis(name) {
	console.warn("MGJWhereis(name) has deprecated in favor of sys.whereis(name)")
	return MinGJ.whereis(name);
}

function MGJuname(argc, argv, sys) {
	console.warn("MGJUname(argc, argv, sys) has deprecated in favor of sys.uname(argv)")
	return sys.uname(argv)
}

function Bash(cmd) {
	MinGJ.print(MGJgetPrompt(), cmd);
	var args = cmd.split(" ");
	var paths = MGJWhereis(args[0]);
	if (paths.length > 0) {
		args.shift();
		MinGJ.exec(paths[0], args);
	} else {
		console.log(`bash: ${args[0]}: command not found`);
	}
}

window.Bash = Bash;

function MGJLogin(username) {
	MinGJ.exec("/bin/su",["-s",username]);
	MinGJ.print(`\n${location.hostname} login: ${username}`)
}

fs.bin.bash = function (argc, argv, sys) {
	if (argv.length > 1) {
		sys.print("JS Bash alpha 1.0");
		return;
	}
}
