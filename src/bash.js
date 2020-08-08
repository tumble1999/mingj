const fs = {
	"bin": {
		"init": function (argc, argv, sys) {
			sys.write("/dev/stdout", "OK.");
		},
	},
	"home": new Object(),
	"mnt": new Object(),
	"etc": {
		"hostname": "MinGJ"
	},
	"dev": new Object()
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

function MGJcreateLogContext(name, cb) {
	var old = fs.dev.stdout.write;
	fs.dev.stdout.write = function (...t) {
		old(`${name}:`, ...t);
	};
	cb();
	fs.dev.stdout.write = old;
}

function MGJuname(argc, argv, sys) {
	var output = [];

	function addArg(a, b, value="") {
		var all = args.includes("-a") || args.includes("--all");
		if(args.includes(`--${a}`) || args.includes(`-${b}`) || (all && value !== "")) {
			output.push(value || "unknown");
		}
	}

	addArg("kernel-name", "v", sys.env.hostname);
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
		MGJcreateLogContext(args[0], function () {
			args.shift();
			MinGJ.exec(paths[0], args);
		});
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

/*
 * Commands:
 * /bin
 */
fs.bin.whereis = function (argc, argv, sys) {
	var places = MGJWhereis(argv[1]);
	var list = places.map(p => `${argv[1]}:${p}`);
	sys.print(list.join("\n"));
}

fs.bin.bash = function (argc, argv, sys) {
	if (args.length > 1) {
		sys.print("JS Bash alpha 1.0");
		return;
	}
}
