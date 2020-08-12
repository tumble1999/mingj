const fs = new Folder({
	"bin": new Folder({
		"init": function (argc, argv, sys) {
			sys.write("/dev/stdout", "OK.");
		},
	}),
	"home": new Folder,
	"mnt": new Folder,
	"etc": new Folder({
		"hostname": "MinGJ"
	}),
	"dev": new Folder
});

var MinGJ = new kernel(fs);

/* Config environment. */
MinGJ.env.username = "js";