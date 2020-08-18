function char_ptr_arr(argv) {
	/*Runtime.*/stackSave();
	var p_argv = /*Runtime.*/stackAlloc(argv.length * 4);
	for (var i = 0; i < argv.length; i++) {
	    var len = argv[i].length + 1;
	    var ptr = /*Runtime.*/stackAlloc(len);
	    stringToUTF8(argv[i], ptr, len);
	    Module.setValue(p_argv + i * 4, ptr, "i32");
	}
	return p_argv;
}