#ifndef _DEVICE_H
#define _DEVICE_H


struct device {
	virtual int init()=0;
	virtual int exit()=0;
};

struct char_device : public device {
	struct file_operations file_operations;
}

#endif //!_DEVICE_H