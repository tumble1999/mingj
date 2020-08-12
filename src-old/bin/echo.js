fs.bin.echo = function (argc, argv, sys) {
	argv.shift();
	sys.print(argv.join(" "));
}