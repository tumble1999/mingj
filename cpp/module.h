#include "device.h"

class module {
private:
		class kernel* m_pkernel;
protected:
	int register_chrdev(int major, const char* name, struct file_operations* fops);
	int unregister_chrdev(int major, const char* name);
public:
	module(class kernel* p_pkernel) {
		m_pkernel = p_pkernel;
	}
	char* name;

	int init();
	int exit();
};