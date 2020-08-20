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



int module::register_chrdev(int major, char* name, struct file_operations fops) {
	return 0;
}
int module::unregister_chrdev(int major, char* name) {
	return 0;
}

#endif //!_FS_H