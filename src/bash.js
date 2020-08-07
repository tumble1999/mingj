var MinGJ = {
	bin:{},
	home:{},
	mnt:{},
	etc:{},
	dev:{}
};

/*
Config
/etc
*/
MinGJ.etc.path = ["/bin"];
MinGJ.etc.cd="/";

function GDGetObj(path,start) {
	path = path.split("/").filter((p)=> p!="");
	var parent = [];
	var file = start||MinGJ;
	for(var folder of path) {
		if(folder == ".") continue;
		if(folder == "..") {
			folder = parent.pop();
			continue;
		}
		parent.push(file);
		file = file[folder];
	}
	return file
}

function GDgetPrompt() {
return `${MinGJ.etc.username}@${location.hostname}:${MinGJ.etc.cd}$`
}

function GDWhereis(arg0) {
	var places = [];
	for (const p of MinGJ.etc.path) {
		var pathDir = GDGetObj(p);
		if(pathDir[arg0]) {
			places.push(p + "/" + arg0);
		}
		//console.log(pathDir);
	}
	return places;
}

function GDjoinPath(a=".",b=".") {
	var start = a[0]=="/"||b[0]=="/"?"/":"";
	var path = [];
	var aP = a.split("/").filter(f=>f!="");
	var bP = b.split("/").filter(f=>f!="");

	function addFolder(f){
		if(f=="..") path.pop();
		if(f!=".." && f!=".")path.push(f)
	}
	if(b[0]!="/") for (const af of aP) addFolder(af);
	for (const bf of bP) addFolder(bf);
	return start + path.join("/");
}

function GDcreateLogContext (name, cb) {
	var cl = console.log;
	console.log = function (...t) {
		cl(`${name}:`, ...t);
	}
	cb()
	console.log = cl;
}

function GDgetAbsolutePath(path){
	if(!path[0] != "/") path = GDjoinPath(MinGJ.etc.cd,path)
	return path;
}

function GDPathExist(path) {
	path = path.split("/").filter(f=>f!="");
	var progress = MinGJ;
	for (const f of path) {
		if(progress[f]!==undefined) {
			progress = progress[f];
		} else {
			return false;
		}
	}
	return true;
}

function Bash(cmd) {
	console.log(GDgetPrompt(),cmd);
	var args = cmd.split(" ");
	var paths = GDWhereis(args[0]);
	if(paths.length>0) {
		GDcreateLogContext(args[0],function(){
			GDGetObj(paths[0])(args);
		});
	} else {
		console.log("bash: " + args[0] + ": command not found");
	}
}
window.Bash = Bash;

function MGJLogin(username) {
	MinGJ.etc.username = username;
	MinGJ.home[username] = {};
	console.log(`\n${location.hostname} login: ${username}`)
}

/*
Commands:
/bin
*/
MinGJ.bin.whereis = function(args) {
	var places = GDWhereis(args[1]);
	var list = places.map(p=>args[1] + ":"+p);
	console.log(list.join("\n"));

}
MinGJ.bin.bash = function(args) {
	if(args.length>1) {
		console.log("JS Bash alpha 1.0");
		return;
	}
}
