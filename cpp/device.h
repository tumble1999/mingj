#ifndef _DEVICE_H
#define _DEVICE_H

#include "sys/types.h"

struct bus {
	char* name;

	virtual int match(struct device*,struct device_driver*)=0;
	virtual int uevent(struct device*,struct device_driver*)=0;
	virtual int probe(struct device*)=0;

};
struct module {
	char* name;
};

struct device_driver {
	char* name;
	module* owner;
	virtual int probe(struct device*)=0;
	virtual int remove(struct device*)=0;
	virtual void shutdown(struct device*)=0;
	virtual int suspend(struct device*,char*)=0;
	virtual int resume(struct device*)=0;

};

struct device_type {
	char* name;
	virtual int event(struct device*, int, char*)=0;
	virtual char* devnode(struct device*,mode_t,uid_t,gid_t)=0;
	virtual void release(struct device*)=0;
};

struct device_class {
	char* name;
	module* owner;

	virtual int dev_event(struct device,int, char*)=0;
	virtual char* devnode(struct device*, mode_t)=0;
	virtual int resume(struct device*)=0;
};

struct device {
	int id;
	char* name;
	device_type* type;
	bus* bus;
	device_driver* driver;
	device_class* dclass;
	void* driver_data;
};


#endif //!_DEVICE_H