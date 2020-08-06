Gniddos.etc.cd="/"

Gniddos.bin.echo = function(args) {
	args.shift();
	console.log(args.join(" "))
}


Gniddos.bin.dir = function(args) {
	if(args.length>1) 
	var path = args.length>1?args[args.length-1]:"."
	if(!path[0] == "/") path = Gniddos.etc.cd + "/" + path
	var things = GDGetObj(path);
	console.log(Object.keys(things).join(" "))
}
Gniddos.bin.help = function(args) {
	Gniddos.etc.path.forEach(p=>Gniddos.bin.dir(["dir",p]));
}
