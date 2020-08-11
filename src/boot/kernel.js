class device
{
	constructor(read, write)
	{
		this.write = write || function (data) {};
		this.read = read || function () {};
	}
}

class blockDevice extends device {
	constructor(size) {
		super();
		this.data = new ArrayBuffer(size);
	}
}

class kernel
{
	constructor(initramfs)
	{
		var t = this;
		var keys = new Array();
		var i = 65;

		keys.push(32);
		while (i <= 90)
		{
			keys.push(i);
			i++;
		}
		i = 160;
		while (i <= 165)
		{
			keys.push(i);
			i++;
		}
		i = 169;
		while (i <= 173)
		{
			keys.push(i);
			i++;
		}
		i = 186;
		while (i <= 193)
		{
			keys.push(i);
			i++;
		}
		i = 219;
		while (i <= 223)
		{
			keys.push(i);
			i++;
		}
		keys.push(231);

		this.fs = initramfs;
		this.env = {
			"cd": "/",
			"path": ["/bin"],
			"hostname": this.fs.etc.hostname
		};

		this.buffer = new String();

		this.fs.dev.stdout = new device(null, console.log);
		this.fs.dev.stderr = new device(null, console.error);

		window.document.body.addEventListener("keyup", function (event) {
			if (event.key == "Backspace" && t.buffer.length > 0)
			{
				t.buffer = t.buffer.substring(0, t.buffer.length - 1);
			} else if (event.key == "Enter")
			{
				t.buffer += '\n';
			} else if (keys.includes(event.keyCode))
			{
				t.buffer += event.key;
			}
		});

		this.fs.dev.stdin = new device(function () {
			return new Promise(function pcb(res) {
				var tmp_buffer = new String();
				if (t.buffer[t.buffer.length - 1] == '\n')
				{
					tmp_buffer = t.buffer;
					t.buffer = new String();
					res(tmp_buffer);
				} else
				{
					setTimeout(function () {
						pcb(res);
					}, 400);
				}
			});
		}, null);
		// this.fork?
		this.exec("/bin/init");
	}

	mount(device, path)
	{
		var new_path = this.getAbsolutePath(path);
		var basename = this.basename(new_path);
		new_path = this.joinPath(new_path, "..");

		this.getObj(new_path)[basename] = device;
		return;
	}

	umount(path)
	{
		var new_path = this.getAbsolutePath(path);
		var basename = this.basename(new_path);
		new_path = this.joinPath(new_path, "..");

		delete this.getObj(new_path)[basename];
		return;
	}

	getObj(path, start)
	{
		var new_path = path.split("/").filter(p => p != "");
		var parent = [];
		var file = start || this.fs;

		for (var folder of new_path) {
			if (folder == ".") continue;

			if (folder == "..")
			{
				folder = parent.pop();
				continue;
			}
			parent.push(file);
			file = file[folder];
		}
		return file;
	}

	getAbsolutePath(path)
	{
		if(!path[0] != "/")
		{
			path = this.joinPath(this.env.cd, path);
		}
		return path;
	}

	joinPath(a = ".", b = ".")
	{
		var start = a[0] == "/" || b[0] == "/" ? "/" : "";
		var path = [];
		var aP = a.split("/").filter(f => f != "");
		var bP = b.split("/").filter(f => f != "");

		function addFolder(f)
		{
			if (f == "..") path.pop();
			if (f != ".." && f != ".") path.push(f);
		}

		if (b[0] != "/")
		{
			for (const af of aP)
			{
				addFolder(af);
			}
		}

		for (const bf of bP)
		{
			addFolder(bf);
		}
		return start + path.join("/");
	}

	pathExist(path)
	{
		var new_path = path.split("/").filter(f => f != "");
		var progress = this.fs;
		for (const f of new_path)
		{
			if (progress[f] !== undefined)
			{
				progress = progress[f];
			} else
			{
				return false;
			}
		}
		return true;
	}

	exec(path, argv)
	{
		var exe = this.getObj(path);
		var new_argv = new Array();
		var old_stdout = new Object();
		var old_stderr = new Object();
		var code = -1;

		if (!(argv instanceof Array))
		{
			argv = new_argv;
		}

		argv.splice(0, 0, path);
		if (exe instanceof Function)
		{
			Object.assign(old_stdout, this.fs.dev.stdout);
			Object.assign(old_stderr, this.fs.dev.stderr);
			if (exe.length == 3)
			{
				code = exe(argv.length, argv, this);
			} else if (exe.length == 2)
			{
				code = exe(argv.length, argv);
			} else
			{
				code = exe();
			}
			Object.assign(this.fs.dev.stdout, old_stdout);
			Object.assign(this.fs.dev.stderr, old_stderr);
		}
		return code;
	}

	basename(path)
	{
		return path.split("/").pop();
	}

	write(path, content)
	{
		var top = this.getObj(this.joinPath(path, ".."));
		var basename = this.basename(path);
		var obj = top[basename];

		if (typeof(obj) == "string" || obj instanceof String)
		{
			top[basename] += content;
		} else if (obj instanceof device)
		{
			obj.write(content);
		} else if (typeof(obj) == "undefined")
		{
			top[basename] = content;
		}
		return;
	}

	read(path)
	{
		var obj = this.getObj(path);

		if (obj instanceof device)
		{
			return obj.read();
		} else
		{
			return obj;
		}
	}

	print(...strings)
	{
		var final = new String();
		strings.forEach(function (string) {
			final += string;
		});
		return this.write("/dev/stdout", final);
	}
}
