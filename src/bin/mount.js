// mount /dev/DEVICE PLACE
fs.bin.mount = function (argc, argv, sys) {
	if (argc < 3) {
		sys.print("Usage: mount DEVICE PLACE");
		return;
	}
	sys.mount(argv[1], argv[2]);
}