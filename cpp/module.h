#include "kernel.h"
#include "device.h"

//class kernel;

class module {
private:
	class kernel* m_kernel;
protected:
	int register_chrdev(int major, const char* name, struct file_operations* fops);
	int unregister_chrdev(int major, const char* name);
public:
	module(class kernel* p_kernel) {m_kernel = p_kernel;}

	char* name;

	int init();
	int exit();
};