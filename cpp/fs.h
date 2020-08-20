#ifndef _FS_H
#define _FS_H

#include "device.h"
#include "sys/types.h"

struct file {};

struct node {};

struct file_operations {
	struct module* owner;
	int FUNC_PTR(open,struct node*, struct file *);
	size_t FUNC_PTR(read,struct file *, char *, size_t, int);
	size_t FUNC_PTR(write,struct file *, char *, size_t, int);
	int FUNC_PTR(close,struct node *, struct file *);
};

#endif //!_FS_H