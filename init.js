var Gniddos = {
	bin:{},
	home:{},
	mnt:{},
	etc:{}
};

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