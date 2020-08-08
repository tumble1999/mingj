MinGJ.bin.echo = function(args) {
	args.shift();
	console.log(args.join(" "))
}


MinGJ.bin.dir = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = MGJgetAbsolutePath(path);
	if(!MGJPathExist(path)) {
		console.log(path, "does not exist")
	}
	var things = MGJGetObj(path);
	console.log(Object.keys(things).join(" "))
}

MinGJ.bin.cd = function(args) {
	var path = args.length>1?args[args.length-1]:"."
	path = MGJgetAbsolutePath(path)
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
	var a = MGJgetAbsolutePath(args[1]);
	var b = MGJgetAbsolutePath(args[2]);

	var place = MGJjoinPath(b,"..");
	var name = b.split("/").pop();
	MGJGetObj(place)[name] = MGJGetObj(a);
}

MinGJ.bin.debug = function() {
	console.info(MinGJ);
}

MinGJ.bin.exit = function() {
	console.log("This command has been disabled.");
}
MinGJ.bin.wget = function(args) {
	var url = args[1]

	var currentFolder = MGJGetObj(MGJgetAbsolutePath("."));
	var urlparts = url.split("/");
	var name = urlparts[urlparts.length-1];
	currentFolder[name] = WEBAPIhttpGet(url);
}

MinGJ.bin.uname = function(args) {
	console.log(MGJuname(args));
}



MinGJ.bin.su = function(args) {
	if(args.length < 2) {
		MinGJ.etc.username = "root";
		return;
	}
	MinGJ.etc.username = args[1]	
}