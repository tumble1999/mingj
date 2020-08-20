#include <stdio.h>
#include "device.h"
#include "fs.h"

class hello_mod : public module
{
public:
	hello_mod(class kernel *kernel) : module(kernel) {}

	static int open(struct node *pnode, struct file *pfile)
	{
	return 0;
	}

	static size_t read(struct file *pfile, char *buffer, size_t length, int offset)
	{
	}

	static size_t write(struct file *pfile, char *buffer, size_t length, int offset)
	{
	}

	static int close(struct node *pnode, struct file *pfile)
	{
	}

	int init()
	{
		printf("Hello World\n");

		struct file_operations hello_file_ops = {
			.owner = this,
			.open = open,
			.read = read,
			.write = write,
			.close = close};

		register_chrdev(
			1,			   //major
			"Hello World", //name
			hello_file_ops);

		return 0;
	}

	int exit()
	{
		printf("Goodbye World\n");
		unregister_chrdev(
			1)

			return 0;
	}
};