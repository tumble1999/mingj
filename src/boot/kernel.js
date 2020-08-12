class kernel {
	constructor(initramfs) {
		var k = this;

		var keys = new Array;
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

		this.buffer = new String;

		this.write("/dev/stdout", new device(null, console.log));
		this.write("/dev/stderr", new device(null, console.error));

		window.document.body.addEventListener("keyup", function (event) {
			if (event.key == "Backspace" && k.buffer.length > 0) {
				k.buffer = k.buffer.substring(0, k.buffer.length - 1);
			} else if (event.key == "Enter") {
				k.buffer += '\n';
			} else if (keys.includes(event.keyCode)) {
				k.buffer += event.key;
			}
		});

		this.write("/dev/stdin", new device(function () {
			return new Promise(function pcb(res) {
				var tmp_buffer = new String();
				if (k.buffer[k.buffer.length - 1] == '\n') {
					tmp_buffer = k.buffer;
					k.buffer = new String;
					res(tmp_buffer);
				} else {
					setTimeout(function () {
						pcb(res);
					}, 400);
				}
			});
		}, null));
		// this.fork?
		this.exec("/bin/init");
	}

	getObj(path, start) {
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

	getAbsolutePath(path) {
		if (!path[0] != "/") {
			path = this.joinPath(this.env.cd, path);
		}
		return path;
	}

	joinPath(a = ".", b = ".") {
		var start = a[0] == "/" || b[0] == "/" ? "/" : "";
		var path = [];
		var aP = a.split("/").filter(f => f != "");
		var bP = b.split("/").filter(f => f != "");

		function addFolder(f) {
			if (f == "..") path.pop();
			if (f != ".." && f != ".") path.push(f);
		}

		if (b[0] != "/") {
			for (const af of aP) {
				addFolder(af);
			}
		}

		for (const bf of bP) {
			addFolder(bf);
		}
		return start + path.join("/");
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
		var exe = this.getObj(path);
		var new_argv = new Array;
		var old_stdout = new Object;
		var old_stderr = new Object;
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

	get_parent(path) {
		return this.joinPath(path, "..");
	}

	basename(path) {
		return path.split("/").pop();
	}

	write(path, content) {
		var top = this.getObj(this.get_parent(path));
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

	delete(path) {
		var top = this.getObj(this.get_parent(path));
		var basename = this.basename(path);
		delete top[basename];
	}

	read(path) {
		var obj = this.getObj(path);

		if (obj instanceof device) {
			return obj.read();
		} else {
			return obj;
		}
	}

	mount(devPath, path) {
		var dev = this.getObj(dev);
		if (dev instanceof blockDevice) {
			this.print("mount: " + devPath + ": Block device mounting coming Soon");
			return;
		}
		if (typeof (dev) != "object") {
			this.print("mount: " + devPath + ": is not a mountable node.")
		}
		this.write(path, dev)
		return;
	}

	umount(path) {
		this.delete(this.getAbsolutePath(path));
	}

	printk(level, ...strings) {
		var text = sprintf(...strings);
		switch (level) {

			case 0:	// KERN_EMERG	Emergency condition, system is probably dead
			case 1:	// KERN_ALERT	Some problem has occurred, immediate attention is needed
			case 2:	// KERN_CRIT	A critical condition
			case 3:	// KERN_ERR	An error has occurred
			case 4:	// KERN_WARNING	A warning
			return this.write("/dev/stderr",text)
			case 5:	// KERN_NOTICE	Normal message to take note of
			case 6:	// KERN_INFO	Some information
			case 7:	// KERN_DEBUG	Debug information related to the program
			default:
			return this.write("/dev/stdout",text);
		}
	}

	printerr(...strings) {
		this.printk(3,...strings);
	}

	print(...strings) {
		this.printk(null,...strings);
		/*var final = new String;
		strings.forEach(function (string) {
			final += string;
		});
		return this.write("/dev/stdout", final);*/
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

	mknod(name, type, major, minor) {
		if (!['b', 'c'].includes(type)) this.print("mknod: " + type + ": invalid device type");
		if (this.pathExist(name)) return 1;
		if (type == 'b') dev = this.write(name, new blockDevice);
		if (type == 'c') dev = this.write(name, new charDevice);
	}

	mkdir(path, mode) {
		if (this.pathExist(path)) return;
		var parent = this.get_parent(path);
		if (!this.pathExist(parent)) this.mkdir(parent);
		this.write(path, new Folder);
	}
}
