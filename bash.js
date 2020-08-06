Gniddos.etc.path = ["/bin"];

function GDWhereis(arg0) {
	var places = [];
	for (const p of Gniddos.etc.path) {
		var pathDir = GDGetObj(p);
		if(pathDir[arg0]) {
			places.push(p + "/" + arg0);
		}
		//console.log(pathDir);
	}
	return places;
}

function GDCall(cmd) {
	var args = cmd.split(" ");
	var paths = GDWhereis(args[0]);
	if(paths.length>0) {
		GDGetObj(paths[0])(args);
	} else {
		console.log("bash: " + args[0] + ": command not found");
	}
}

Gniddos.bin.whereis = function(args) {
	var places = GDWhereis(args[1]);
	var list = places.map(p=>args[1] + ":"+p);
	console.log(list.join("\n"));

}
Gniddos.bin.bash = function(args) {
	if(args.length>1) {
		console.log("Critter Bash alpha 1.0");
		return;
	}
}


cardboard.on("worldCreated", (world) => {
	commandPrefixes["$"] = function(msg) {
		msg = msg.substr(1);
		GDCall(msg)
	}
	console.log(commandPrefixes);
});