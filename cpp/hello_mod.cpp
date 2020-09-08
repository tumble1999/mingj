#include <stdio.h>
#include "module.h"
#include "fs.h"

class hello_mod : public module
{
public:
	hello_mod(class kernel *kernel) : module(kernel) {}

	static int open(struct node *pnode, struct file *pfile)
	{
		printf("Hello Open\n");
		return 0;
	}

	static size_t read(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		printf("Hello Read\n");
		return 0;
	}

	static size_t write(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		printf("Hello Write\n");
		return count;
	}

	static int close(struct node *pnode, struct file *pfile)
	{
		printf("Hello Close\n");
		return 0;
	}

	virtual int init()
	{
		printf("Hello World\n");

		struct file_operations hello_file_ops = {
			.owner = this,
			.open = open,
			.read = read,
			.write = write,
			.close = close};

		register_chrdev(
			2,	   //major
			"Hello Driver", //name
			&hello_file_ops);

		return 0;
	}

	virtual int exit()
	{
		printf("Goodbye World\n");
		unregister_chrdev(1,"Hello Driver");
		return 0;
	}
};