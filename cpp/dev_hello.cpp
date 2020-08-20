#ifndef _DEV_HELLO_H
#define _DEV_HELLO_H

#include <stdio.h>

#include "device.h"

class dev_hello: public device {
public:
	dev_hello(){}
	int init() {
		printf("Hello World\n");
		return 0;
	}

	int exit() {
		printf("Goodbye World\n");
		return 0;
	}
};

#endif //!_DEV_HELLO_H