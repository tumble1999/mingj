fs.bin.cd = function (argc, argv, sys) {
	var path = argc > 1 ? argv[argc - 1] : ".";
	path = sys.getAbsolutePath(path);
	sys.env.cd = path;
}