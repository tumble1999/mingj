#ifndef _DEVICE_H
#define _DEVICE_H

#include "sys/types.h"
#include "major.h"

#define MINORBITS 20
#define MINORMASK ((1U << MINORBITS) - 1)
#define MAJOR(dev) ((unsigned int)((dev) >> MINORBITS))
#define MINOR(dev) ((unsigned int)((dev)&MINORMASK))
#define MKDEV(ma,mi) (((ma) << MINORBITS)|(mi))

struct bus
{
	char *name;

	int FUNC_PTR(match, struct device *, struct device_driver *);
	int FUNC_PTR(uevent, struct device *, struct device_driver *);
	int FUNC_PTR(probe, struct device *);
};

struct device_driver
{
	char *name;
	struct module *owner;
	int FUNC_PTR(probe, struct device *);
	int FUNC_PTR(remove, struct device *);
	void FUNC_PTR(shutdown, struct device *);
	int FUNC_PTR(suspend, struct device *, char *);
	int FUNC_PTR(resume, struct device *);
};

struct device_type
{
	char *name;
	int FUNC_PTR(event, struct device *, int, char *);
	char *FUNC_PTR(devnode, struct device *, mode_t, uid_t, gid_t);
	void FUNC_PTR(release, struct device *);
};

struct device_class
{
	char *name;
	struct module *owner;

	int FUNC_PTR(dev_event, struct device, int, char *);
	char *FUNC_PTR(devnode, struct device *, mode_t);
	int FUNC_PTR(resume, struct device *);
};

struct device
{
	int id;
	char *name;
	device_type *type;
	bus *bus;
	device_driver *driver;
	device_class *dclass;
	void *driver_data;
};


struct device_struct {
	const char * name;
	struct file_operations * fops;
};

#endif //!_DEVICE_H