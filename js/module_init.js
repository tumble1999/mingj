var Module = {
	onRuntimeInitialized: function() {
		console.log("[WASM] Runtime Intialized");
		Module.kernel.prototype.syscall = function(call,...argv) {
			Module._syscall(this,argv.length,char_ptr_arr(argv));
		}
	}
}