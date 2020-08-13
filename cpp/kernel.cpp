#ifndef _KERNEL_H
#define _KERNEL_H

class kenerl {
public:
	void panic(std::string str) {
		printk("Kernel panic: %s\n\r",s);
		for(;;);
	};
	int printf(std::string fmt, ...);
	int printk(std::string fmt, ...);
	int tty_write(unsigned ch, std::string buf, int count);
}

#endif //!_KERNEL_H
