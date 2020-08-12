fs.bin.env = function (argc, argv, sys) {
	for (const env in sys.env) {
		sys.print(env+"="+sys.env[env]);
	}
}