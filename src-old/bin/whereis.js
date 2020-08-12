fs.bin.whereis = function (argc, argv, sys) {
	var places = MGJWhereis(argv[1]);
	var list = places.map(p => `${argv[1]}:${p}`);
	sys.print(list.join("\n"));
}