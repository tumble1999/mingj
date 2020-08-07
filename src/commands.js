MinGJ.bin.echo = function(args) {
	args.shift();
	console.log(args.join(" "))
}


MinGJ.bin.dir = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = GDgetAbsolutePath(path);
	if(!GDPathExist(path)) {
		console.log(path, "does not exist")
	}
	var things = GDGetObj(path);
	console.log(Object.keys(things).join(" "))
}

MinGJ.bin.cd = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = GDgetAbsolutePath(path)
	MinGJ.etc.cd = path;
}
MinGJ.bin.help = function(args) {
	MinGJ.etc.path.forEach(p=>MinGJ.bin.dir(["dir",p]));
}

// mount /dev/DEVICE PLACE
MinGJ.bin.mount = function(args) {
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

MinGJ.bin.debug = function() {
	console.info(MinGJ);
}

MinGJ.bin.exit = function() {
	cheerio();
}
MinGJ.bin.wget = function(args) {
	var url = args[1]

	var currentFolder = GDGetObj(GDgetAbsolutePath("."));
	var urlparts = url.split("/");
	var name = urlparts[urlparts.length-1];
	currentFolder[name] = WEBAPIhttpGet(url);
}