

fs.bin.bash = function (argc, argv, sys) {
	

	function clearParamEnv() {
		var i = 0;
		while (sys.env[i]) { delete sys.env[i];i++; };
	}

	function loginBash() {

	}


	if (argc < 2) {
		MinGJ.print("JS Bash alpha 1.0");
		return;
	}
	Object.assign(sys.env, argv);
	argv.shift();
	sys.print(MGJgetPrompt(), argv.join(" "));
	var opt_param = false;
	var opt_end = false;
	while (argv.length > 1) {
		var param = argv[0];
		if (!opt_end && param[0] == '-') {
			param = argv.shift();
			switch (param) {
				case '-c':
					clearParamEnv();
					Object.assign(sys.env, argv)
					break;
				case '-l':
					loginBash();
				default:
			}

			continue;
		}
		var paths = MGJWhereis(argv[0]);
		if (paths.length > 0) {
			argv.shift();
			sys.exec(paths[0], argv);
		} else {
			sys.print(`${sys.env[0]}: ${argv[0]}: command not found`);
		}
	}
	clearParamEnv();
}


function MGJgetPrompt() {
	return `${MinGJ.env.username}@${location.hostname}:${MinGJ.env.cd}$ `
}

function MGJWhereis(name) {
	var places = [];
	for (const p of MinGJ.env.path) {
		var pathDir = MinGJ.getObj(p);
		if (pathDir[name]) {
			places.push(`${p}/${name}`);
		}
		//console.log(pathDir);
	}
	return places;
}

function MGJLogin(username) {
	MinGJ.env.username = username;
	if (typeof(MinGJ.home[username]) != "object") {
		MinGJ.home[username] = {};
	}
	console.log(`\n${location.hostname} login: ${username}`)
}