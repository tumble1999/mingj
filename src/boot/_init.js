const fs = {
	"bin": new Folder({
		"init": function (argc, argv, sys) {
			sys.write("/dev/stdout", "OK.");
		},
	}),
	"home": new Folder,
	"mnt": new Folder,
	"etc": new Folder({
		"hostname": "MinGJ"
	}),
	"dev": new Folder
};


var MinGJ = new kernel(fs);
var shell = (cmd) => {
	//MinGJ.exec(MinGJ.env.shell, cmd.split(" "));
	
	MinGJ.print(MGJgetPrompt(), cmd);
	var argv = cmd.split(" ");
	var paths = MGJWhereis(argv[0]);
	if (paths.length > 0) {
		argv.shift();
		
	} else {
		console.log(`bash: ${argv[0]}: command not found`);
	}
};

/* Config environment. */
MinGJ.env.username = "js";