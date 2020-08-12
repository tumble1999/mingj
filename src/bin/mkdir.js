fs.bin.mkdir = function(argc,argv,sys) {
	argv.shift()
	argv.forEach(path => {
		path = sys.getAbsolutePath(path);
		sys.mkdir(path);
	});
}