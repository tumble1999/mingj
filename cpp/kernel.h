#ifndef _KERNEL_H
#define _KERNEL_H

#include <stdio.h>
#include <iostream>
#include <string.h>

#include "device.h"

//#define PAGE_SHIFT			12
//#define PAGE_SIZE			((unsigned long)1<<PAGE_SHIFT)
#define PAGE_MASK			(~(PAGE_SIZE-1))
#define PAGE_ALIGN(addr)		(((addr)+PAGE_SIZE-1)&PAGE_MASK)

extern char empty_zero_page[PAGE_SIZE];

#define PARAM	empty_zero_page
#define EXT_MEM_K (*(unsigned short *) (PARAM+2))
#define DRIVE_INFO (*(struct kernel::drive_info_struct *) (PARAM+0x80))
#define SCREEN_INFO (*(struct screen_info *) (PARAM+0))
#define MOUNT_ROOT_RDONLY (*(unsigned short *) (PARAM+0x1F2))
#define RAMDISK_SIZE (*(unsigned short *) (PARAM+0x1F8))
#define ORIG_ROOT_DEV (*(unsigned short *) (PARAM+0x1FC))
#define AUX_DEVICE_INFO (*(unsigned char *) (PARAM+0x1FF))

#define MAX_INIT_ARGS 8
#define MAX_INIT_ENVS 8
#define COMMAND_LINE ((char *) (PARAM+2048))
#define COMMAND_LINE_SIZE 256




class kernel
{
private:
	const char *k_exceptions[1] = {
		"Division by zero"};

	struct device_struct chrdevs[MAX_CHRDEV] = {{NULL, NULL}};
	struct device_struct blkdevs[MAX_BLKDEV] = {{NULL, NULL}};

	char end;
	unsigned long memory_start = 0;	/* After mem_init, stores the */
						/* amount of free user memory */
	unsigned long memory_end = 0;
	unsigned long low_memory_start = 0;
	//char term[21];
	//int rows, cols;

	//char* argv_init[MAX_INIT_ARGS+2] = { "init", NULL, };
	//char* envp_init[MAX_INIT_ENVS+2] = { "HOME=/", term, NULL, };

	//char* argv_rc[2] = { "/bin/sh", NULL };
	//char* envp_rc[3] = { "HOME=/", term, NULL };

	//char* argv[2] = { "-/bin/sh",NULL };
	//char* envp[3] = { "HOME=/usr/root", term, NULL };

	//struct drive_info_struct { char dummy[32]; } drive_info;
	//struct screen_info screen_info;

	
	//unsigned char aux_device_present;
	int ramdisk_size;
	//int root_mountflags = 0;


public:
	kernel();
	void init();

	struct device_struct *get_chrdevs();
	struct device_struct *get_blkdevs();
	struct device_struct *get_chrdev(unsigned int major);
	struct device_struct *get_blkdev(unsigned int major);
	int test();
	void panic(int exception);
	int tty_write(unsigned ch, std::string buf, int count);
	int syscall(int p_syscall, int argc, char** argv);
	
};

#endif //!_KERNEL_H