const fs = {
	"bin": new Folder({
		"init": function (argc, argv, sys) {
			sys.write("/dev/stdout", "OK.");
		},
	}),
	"home": new Folder(),
	"mnt": new Folder(),
	"etc": new Folder({
		"hostname": "MinGJ"
	}),
	"dev": new Folder()
};

var MinGJ = new kernel(fs);

/* Config environment. */
MinGJ.env.username = "js";

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

function MGJuname(argc, argv, sys) {
	var output = [];

	function addArg(a, b, value="") {
		var all = argv.includes("-a") || argv.includes("--all");
		if (argv.includes(`--${a}`) || argv.includes(`-${b}`) || (all && value !== "")) {
			output.push(value || "unknown");
		}
	}

	addArg("kernel-name", "v", "MinGJ");
	addArg("nodename", "n", location.hostname);
	addArg("kernel-release", "r");
	addArg("kernel-version", "v");
	addArg("machine", "m", platform.os);
	addArg("processor", "p");
	addArg("hardware-platform", "i");
	addArg("operating-system", "o", platform.name);
	return output.join(" ");
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
	MinGJ.env.username = username;
	if (typeof(MinGJ.home[username]) != "object") {
		MinGJ.home[username] = {};
	}
	console.log(`\n${location.hostname} login: ${username}`)
}

fs.bin.bash = function (argc, argv, sys) {
	if (argv.length > 1) {
		sys.print("JS Bash alpha 1.0");
		return;
	}
}
