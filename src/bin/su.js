fs.bin.su = function (argc, argv, sys) {
	if (argc < 2) {
		sys.env.username = "root";
	} else {
		var name = argv[argc - 1];
		if (name == "-s") {
			name = "root";
		}
		sys.env.username = name;
	}

	if (argv.includes("-s")) {
		if (sys.env.username == "root") {
			fs.root = fs.root || new Object();
			fs.env.cd  = "/root";
		} else {
			fs.home[sys.env.username] = fs.home[sys.env.username] || new Object();
			sys.env.cd = `/home/${sys.env.username}`;
		}
	}
}