fs.bin.uname = function (argc, argv, sys) {
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
	sys.print(output.join(" "));
}
