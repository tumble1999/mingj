#ifndef _KERNEL_H
#define _KERNEL_H

#include <stdio.h>
#include <iostream>
#include <string.h>

#include "device.h"

class kernel
{
private:
	const char *k_exceptions[1] = {
		"Division by zero"};

	struct device_struct chrdevs[MAX_CHRDEV] = {{NULL, NULL}};
	struct device_struct blkdevs[MAX_BLKDEV] = {{NULL, NULL}};

	int chrdev_open(struct node *node, struct file *file);

public:
	kernel();
	struct device_struct *get_chrdevs();
	struct device_struct *get_blkdevs();
	struct device_struct *get_chrdev(unsigned int major);
	struct device_struct *get_blkdev(unsigned int major);
	int test();
	void panic(int exception);
	int tty_write(unsigned ch, std::string buf, int count);
	int syscall(int p_syscall, int argc, char **argv);
};

#endif //!_KERNEL_H