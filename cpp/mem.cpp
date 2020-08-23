#include <stdio.h>
#include "module.h"
#include "fs.h"


class memory_mod: public module {
	memory_mod(class kernel* kernel) :module(kernel){}
	virtual int init() {
		printf("Initializing Memory Module");
	}

	virtual int exit() {

	}
}