fs.bin.mknod = function(argc,argv,sys) {
	argv.shift();
	sys.mknod(...argv);
}