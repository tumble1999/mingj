var Module = {
	onRuntimeInitialized: function() {
		console.log("[WASM] Runtime Intialized");
		Module.kernel.prototype.syscall = function(call,...argv) {
			return Module._syscall(this,call,argv.length,char_ptr_arr(argv));
		}
	}
}