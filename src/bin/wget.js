
fs.bin.wget = function (argc, argv, sys) {
	var url = argv[1];
	sys.write(sys.basename(url),WEBAPIhttpGet(url))
}