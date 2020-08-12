
fs.bin.wget = function (argc, argv, sys) {
	var url = argv[1];

	var currentFolder = sys.open(sys.getAbsolutePath("."));
	var urlparts = url.split("/");
	var name = urlparts[urlparts.length - 1];
	currentFolder[name] = WEBAPIhttpGet(url);
}