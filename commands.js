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
}
Gniddos.bin.help = function(args) {
	Gniddos.etc.path.forEach(p=>Gniddos.bin.dir(["dir",p]));
}

// mount /dev/DEVICE PLACE
Gniddos.bin.mount = function(args) {
	if(args.length < 3) {
		console.log("Usage: mount DEVICE PLACE");
		return;
	}
	var a = GDgetAbsolutePath(args[1]);
	var b = GDgetAbsolutePath(args[2]);

	var place = GDjoinPath(b,"..");
	var name = b.split("/").pop();
	GDGetObj(place)[name] = GDGetObj(a);
}

Gniddos.bin.debug = function() {
	console.info(Gniddos);
}
