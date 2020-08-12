fs.bin.cat = function (argc, argv, sys) {
	var final = new String();
	var tmp = new String();
	var err = 0;

	argv.shift();
	argv.forEach(function (file) {
		if (sys.pathExist(sys.getAbsolutePath(file)))
		{
			tmp = sys.getObj(sys.getAbsolutePath(file));
			if (typeof(tmp) == "string" || tmp instanceof String)
			{
				final += tmp;
			} else
			{
				err = -1;
				return sys.write("/dev/stderr", `Error: ${sys.getAbsolutePath(file)} is not a normal file.`);
			}
		} else
		{
			err = -1;
			return sys.write("/dev/stderr", `Error: ${sys.getAbsolutePath(file)} does not exist.`);
		}
	});
	return (err != 0 ? err : sys.print(final));
}