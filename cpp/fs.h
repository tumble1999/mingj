#ifndef _FS_H
#define _FS_H

#include "device.h"

struct node {
	char* name;
	device* device;
	struct node* parent;
	struct node* next_sibling;
	char* fullpath;
};

struct folder : public node {
	struct node* children;
	int child_count=0;
};


struct file_operations {
	virtual int read()=0;
	virtual int write()=0;
	virtual int open()=0;
}

#endif //!_FS_H