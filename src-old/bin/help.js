fs.bin.help = function (argc, argv, sys) {
	MinGJ.env.path.forEach(p => sys.exec("/bin/dir", [p]));
}