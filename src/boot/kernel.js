class kernel {
	constructor(initramfs) {
		var t = this;
		var keys = new Array();
		var i = 65;

		keys.push(32);
		while (i <= 90) {
			keys.push(i);
			i++;
		}
		i = 160;
		while (i <= 165) {
			keys.push(i);
			i++;
		}
		i = 169;
		while (i <= 173) {
			keys.push(i);
			i++;
		}
		i = 186;
		while (i <= 193) {
			keys.push(i);
			i++;
		}
		i = 219;
		while (i <= 223) {
			keys.push(i);
			i++;
		}
		keys.push(231);

		this.fs = initramfs;
		this.env = {
			"shell": "/bin/bash",
			"cd": "/",
			"path": ["/bin"],
			"hostname": this.fs.etc.hostname
		};

		this.buffer = new String();

		this.fs.dev.stdout = new device(null, console.log);
		this.fs.dev.stderr = new device(null, console.error);

		window.document.body.addEventListener("keyup", function (event) {
			if (event.key == "Backspace" && t.buffer.length > 0) {
				t.buffer = t.buffer.substring(0, t.buffer.length - 1);
			} else if (event.key == "Enter") {
				t.buffer += '\n';
			} else if (keys.includes(event.keyCode)) {
				t.buffer += event.key;
			}
		});

		this.fs.dev.stdin = new device(function () {
			return new Promise(function pcb(res) {
				var tmp_buffer = new String();
				if (t.buffer[t.buffer.length - 1] == '\n') {
					tmp_buffer = t.buffer;
					t.buffer = new String();
					res(tmp_buffer);
				} else {
					setTimeout(function () {
						pcb(res);
					}, 400);
				}
			});
		}, null);
		// this.fork?
		this.exec("/bin/init");
	}

	open(path, start) {
		var new_path = path.split("/").filter(p => p != "");
		var parent = [];
		var file = start || this.fs;

		for (var folder of new_path) {
			if (folder == ".") continue;

			if (folder == "..") {
				folder = parent.pop();
				continue;
			}
			parent.push(file);
			file = file[folder];
		}
		return file;
	}

	realpath(...path) {
		path = path.join("/");
		var resolved_path = new Array;
		var parts = path.split("/").filter(part=>(part!==""&&part!=="."));

		for(var part of parts) {
			if(part=="..") resolved_path.pop();
			else resolved_path.push(part);
		}
		return (path[0]=="/"?"/":"") + resolved_path.join("/");
	}

	getAbsolutePath(path) {
		console.info("please can someone find the  name for a syscall that adds path to cd");
		return this.realpath((path[0]=="/"?"":this.env.cd+"/")+path);
	}

	joinPath(a = ".", b = ".") {
		console.warn("sys.joinPath has been depracated for the more acurate sys.realpath");
		return this.realpath(a + "/" + b);
	}

	pathExist(path) {
		var new_path = path.split("/").filter(f => f != "");
		var progress = this.fs;
		for (const f of new_path) {
			if (progress[f] !== undefined) {
				progress = progress[f];
			} else {
				return false;
			}
		}
		return true;
	}

	exec(path, argv) {
		var exe = this.open(path);
		var new_argv = new Array();
		var old_stdout = new Object();
		var old_stderr = new Object();
		var code = -1;

		if (!(argv instanceof Array)) {
			argv = new_argv;
		}

		argv.splice(0, 0, path);
		if (exe instanceof Function) {
			Object.assign(old_stdout, this.fs.dev.stdout);
			Object.assign(old_stderr, this.fs.dev.stderr);
			if (exe.length == 3) {
				code = exe(argv.length, argv, this);
			} else if (exe.length == 2) {
				code = exe(argv.length, argv);
			} else {
				code = exe();
			}
			Object.assign(this.fs.dev.stdout, old_stdout);
			Object.assign(this.fs.dev.stderr, old_stderr);
		}
		return code;
	}

	parentPath(path) {
		return this.realpath(path + "/..");
	}

	basename(path) {
		return path.split("/").pop();
	}

	write(path, content) {
		var top = this.open(this.realpath(path + "/.."));
		var basename = this.basename(path);
		var obj = top[basename];

		if (typeof (obj) == "string" || obj instanceof String) {
			top[basename] += content;
		} else if (obj instanceof device) {
			obj.write(content);
		} else if (typeof (obj) == "undefined") {
			top[basename] = content;
		}
		return;
	}

	read(path) {
		var obj = this.open(path);

		if (obj instanceof device) {
			return obj.read();
		} else {
			return obj;
		}
	}

	mount(devPath, path) {
		var dev = this.open(dev);

		if(dev instanceof blockDevice){
			this.print("mount: " + devPath + ": Block device mounting coming Soon");
			return;
		}
		if(typeof(dev) != "object") {
			this.print("mount: " + devPath + ": is not a mountable node.")
			return;
		}

		this.write(path,dev)
		return;
	}

	umount(path) {
		var new_path = this.getAbsolutePath(path);
		var basename = this.basename(new_path);
		new_path = this.realpath(new_path + "/..");

		delete this.open(new_path)[basename];
		return;
	}

	print(...strings) {
		var final = new String();
		strings.forEach(function (string) {
			final += string;
		});
		return this.write("/dev/stdout", final);
	}

	gendevname(obj) {
		var name = obj.constructor.name;
		var i = 1;
		while (true) {
			if (this.fs.dev[name + i] == obj || !this.fs.dev[name + i]) break;
			i++;
		}
		name = name + i;
	}

	mknod(name,type,major,minor) {
		if(!['b','c'].includes(type)) this.print("mknod: "+type +": invalid device type");
		if(type=='b') this.write(name,new blockDevice());
		if(type=='c') this.write(name, new charDevice());
	}

	mkdir(path,mode) {
		if(this.pathExist(path)) return;
		var parent = this.parentPath(path);
		if(!this.pathExist(parent)) this.mkdir(parent);
		this.write(path,new Folder);
	}
	uname(argv) {
		var output = [];
	
		function addArg(a, b, value="") {
			var all = argv.includes("-a") || argv.includes("--all");
			if (argv.includes(`--${a}`) || argv.includes(`-${b}`) || (all && value !== "")) {
				output.push(value || "unknown");
			}
		}
	
		addArg("kernel-name", "v", "MinGJ");
		addArg("nodename", "n", location.hostname);
		addArg("kernel-release", "r");
		addArg("kernel-version", "v");
		addArg("machine", "m", platform.os);
		addArg("processor", "p");
		addArg("hardware-platform", "i");
		addArg("operating-system", "o", platform.name);
		return output.join(" ");
	}

	whereis(name) {
		var places = [];
		for (const p of MinGJ.env.path) {
			var pathDir = MinGJ.open(p);
			if (pathDir[name]) {
				places.push(`${p}/${name}`);
			}
			//console.log(pathDir);
		}
		return places;
	}

	getprompt(){
		var username = this.env.username||"root";
		return `${username}@${location.hostname}:${this.env.cd}${username=="root"?"#":"$"} `;
	}
}
