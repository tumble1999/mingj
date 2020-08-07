Gniddos.bin.echo = function(args) {
	args.shift();
	console.log(args.join(" "))
}


Gniddos.bin.dir = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = GDgetAbsolutePath(path);
	if(!GDPathExist(path)) {
		console.log(path, "does not exist")
	}
	var things = GDGetObj(path);
	console.log(Object.keys(things).join(" "))
}

Gniddos.bin.cd = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = GDgetAbsolutePath(path)
	Gniddos.etc.cd = path;
	console.log(Gniddos.etc.cd);
}
Gniddos.bin.help = function(args) {
	Gniddos.etc.path.forEach(p=>Gniddos.bin.dir(["dir",p]));
}
