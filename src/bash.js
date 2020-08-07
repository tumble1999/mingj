var Gniddos = {
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
Gniddos.etc.path = ["/bin"];
Gniddos.etc.cd="/";

function GDGetObj(path,start) {
	path = path.split("/").filter((p)=> p!="");
	var parent = [];
	var file = start||Gniddos;
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
return `${world.player.nickname}@${location.hostname}:${Gniddos.etc.cd}$`
}

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
	if(!path[0] != "/") path = GDjoinPath(Gniddos.etc.cd,path)
	return path;
}

function GDPathExist(path) {
	path = path.split("/").filter(f=>f!="");
	var progress = Gniddos;
	for (const f of path) {
		if(progress[f]!==undefined) {
			progress = progress[f];
		} else {
			return false;
		}
	}
	return true;
}

function GDCall(cmd) {
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

/*
Commands:
/bin
*/
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

cardboard.on("login", (world) => {
	Gniddos.home[world.player.nickname] = {};
	console.log(`\n${location.hostname} login: ${world.player.nickname}`)
})

/*
Device management
/dev
*/
var onEvt = cardboard.on.bind(cardboard);
([
	"loadScriptClient","loadScriptLogin","loadScriptIndex",
	"loadScriptUnityProgress","loadScriptUnityLoader","loadScriptShowGame",
	"clientConnected",
	"worldCreated","worldSocketCreated","woldStageCreated",
	"worldStageCreated","worldManifestCreated",
	"login","joinRoom"
]).forEach(e=> {
	onEvt(e,function(a,b){
		function genDev(obj) {
			var name = obj.constructor.name;
			var i = 1;
			while(true){
				if(Gniddos.dev[name+i]==obj||!Gniddos.dev[name+i]) break;
				i++;
			}
			name = name+i;
			Gniddos.dev[name] = obj;
			console.log("bash: found device /dev/"+name,obj);
		}
		if(a) genDev(a);
		if(b) genDev(b);
	})
})