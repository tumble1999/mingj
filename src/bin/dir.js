fs.bin.dir = function (argc, argv, sys) {
	var path = argc > 1 ? argv[argc - 1] : ".";
	path = sys.getAbsolutePath(path);
	if (!sys.pathExist(path)) {
		sys.print(`${path} does not exist`);
	}
	var things = sys.getObj(path);
	sys.print(Object.keys(things).join(" "));
}