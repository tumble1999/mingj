fs.bin.echo = function (argc, argv, sys) {
	argv.shift();
	sys.print(argv.join(" "));
}

fs.bin.dir = function (argc, argv, sys) {
	var path = argc > 1 ? argv[argc - 1] : ".";
	path = sys.getAbsolutePath(path);
	if (!sys.pathExist(path)) {
		sys.print(`${path} does not exist`);
	}
	var things = sys.getObj(path);
	sys.print(Object.keys(things).join(" "));
}

fs.bin.cd = function (argc, argv, sys) {
	var path = argc > 1 ? argv[argc - 1] : ".";
	path = sys.getAbsolutePath(path);
	sys.env.cd = path;
}

fs.bin.help = function (argc, argv, sys) {
	MinGJ.env.path.forEach(p => sys.exec("/bin/dir", [p]));
}

// mount /dev/DEVICE PLACE
fs.bin.mount = function (argc, argv, sys) {
	if (argc < 3) {
		sys.print("Usage: mount DEVICE PLACE");
		return;
	}
	mount(argv[1], argv[2]);
}

fs.bin.debug = function (argc, argv, sys) {
	sys.print(sys);
}

fs.bin.exit = function (argc, argv, sys) {
	sys.print("This command has been disabled.");
}

fs.bin.wget = function (argc, argv, sys) {
	var url = argv[1];

	var currentFolder = sys.getObj(sys.getAbsolutePath("."));
	var urlparts = url.split("/");
	var name = urlparts[urlparts.length - 1];
	currentFolder[name] = WEBAPIhttpGet(url);
}

fs.bin.uname = function (argc, argv, sys) {
	sys.write(MGJuname(argc, argv, sys));
}

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

fs.bin.cat = function (argc, argv, sys) {
	var final = new String();
	var tmp = new String();
	var err = 0;

	argv.shift();
	argv.forEach(function (file) {
		if (sys.pathExist(sys.getAbsolutePath(file)))
		{
			tmp = sys.getObj(sys.getAbsolutePath(file));
			if (typeof(tmp) == "string" || tmp instanceof String)
			{
				final += tmp;
			} else
			{
				err = -1;
				return sys.write("/dev/stderr", `Error: ${sys.getAbsolutePath(file)} is not a normal file.`);
			}
		} else
		{
			err = -1;
			return sys.write("/dev/stderr", `Error: ${sys.getAbsolutePath(file)} does not exist.`);
		}
	});
	return (err != 0 ? err : sys.print(final));
}
