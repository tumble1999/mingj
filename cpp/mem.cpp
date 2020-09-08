#include <stdio.h>
#include "module.h"
#include "fs.h"

#include "asm/segment.h"

/*
PALLETE
static int open(struct node *pnode, struct file *pfile)
static size_t read(struct node *pnode, struct file *pfile, char *buffer, int count)
static size_t write(struct node *pnode, struct file *pfile, char *buffer, int count)
static int close(struct node *pnode, struct file *pfile)
*/
class memory_mod : public module
{
private:
	static size_t read_ram(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		//TODO: Error code
		return -1;
	}

	static size_t write_ram(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		//TODO: Error code
		return -1;
	}

	static size_t read_mem(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		return 0;
	}

	static size_t write_mem(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		return count;
	}

	static size_t read_null(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		return 0;
	}
	static size_t write_null(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		return count;
	}

	static size_t read_zero(struct node *pnode, struct file *pfile, char *buffer, int count)
	{
		int left;
		for (left = count; left > 0; left--)
		{
			//put_fs_byte(0,buffer);
			buffer++;
		}
		return count;
	}

	static size_t read_full(struct node *node, struct file *file, char *buf, int count)
	{
		return count;
	}

	static size_t write_full(struct node *pnode, struct file *pfile, char *buf, int count)
	{
		//TODO: Error code
		return -1;
	}

#define write_zero write_null

	static int memory_open(struct node *pnode, struct file *pfile)
	{
		struct file_operations ram_fops = {
			//.owner = this,
			.read = read_ram,
			.write = write_ram};
		struct file_operations mem_fops = {
			//.owner = this,
			.read = read_mem,
			.write = write_mem};
		struct file_operations null_fops = {
			//.owner = this,
			.read = read_null,
			.write = write_null};
		struct file_operations zero_fops = {
			//.owner = this,
			.read = read_zero,
			.write = write_zero};
		struct file_operations full_fops = {
			//.owner = this,
			.read = read_full,
			.write = write_full};

		switch (MINOR(pnode->i_rdev))
		{
		case 0:
			pfile->f_op = &ram_fops;
			break;
		case 1:
			pfile->f_op = &mem_fops;
			break;
		/*case 2:
		pfile->f_op = &kmem_fops;
		break;*/
		case 3:
			pfile->f_op = &null_fops;
			break;
		/*case 4:
		pfile->f_op = &port_fops;
		break;*/
		case 5:
			pfile->f_op = &zero_fops;
			break;
		case 7:
			pfile->f_op = &full_fops;
			break;
		default:
			//TODO: Error code
			return -1;
		}
		if (pfile->f_op && pfile->f_op->open)
			return pfile->f_op->open(pnode, pfile);
		return 0;
	}

public:
	memory_mod(class kernel *kernel) : module(kernel) {}

	virtual int init()
	{
		printf("Initializing Memory Module\n");

		struct file_operations memory_fops = {
			.owner = this,
			.open = memory_open,
		};

		//init chardevs
		if (register_chrdev(MEM_MAJOR,"mem",&memory_fops))
			printf("unable to get major %d for memory devs\n", MEM_MAJOR);

		//init blkdevs
		return 0;
	}

	virtual int exit()
	{
		//uninit chardevs
		//uninit blkdevs
		return 0;
	}
};