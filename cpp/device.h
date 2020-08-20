#ifndef _DEVICE_H
#define _DEVICE_H

#include "sys/types.h"

struct bus {
	char* name;

	int FUNC_PTR(match,struct device*,struct device_driver*);
	int FUNC_PTR(uevent,struct device*,struct device_driver*);
	int FUNC_PTR(probe,struct device*);

};
class kernel;
struct module {
private:
		kernel* m_pkernel;
protected:
	int register_chrdev(int major, char* name, struct file_operations file_ops);
	int unregister_chrdev(int major, char* name);
public:
	module(kernel* p_pkernel) {
		m_pkernel = p_pkernel;
	}
	char* name;

	int init();
	int exit();
};

struct device_driver {
	char* name;
	module* owner;
	int FUNC_PTR(probe,struct device*);
	int FUNC_PTR(remove,struct device*);
	void FUNC_PTR(shutdown,struct device*);
	int FUNC_PTR(suspend,struct device*,char*);
	int FUNC_PTR(resume,struct device*);

};

struct device_type {
	char* name;
	int FUNC_PTR(event,struct device*, int, char*);
	char* FUNC_PTR(devnode,struct device*,mode_t,uid_t,gid_t);
	void FUNC_PTR(release,struct device*);
};

struct device_class {
	char* name;
	module* owner;

	int FUNC_PTR(dev_event,struct device,int, char*);
	char* FUNC_PTR(devnode,struct device*, mode_t);
	int FUNC_PTR(resume,struct device*);
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