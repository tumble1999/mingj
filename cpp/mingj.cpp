#ifndef _KERNEL_H
#define _KERNEL_H

//based off https://elixir.bootlin.com/linux/0.01/source/include/linux/kernel.h

//#include <emscripten.h>
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <stdio.h>
#include <iostream>
#include <string.h>

#include "sys/types.h"
#include "sys/calls.h"

#include "processes/proc_sched.cpp"
#include "device.h"

#include "dev_hello.cpp"

#define printk(fmt, ...) printf(fmt, __VA_ARGS__)

using namespace emscripten;
using namespace std;

typedef enum k_exception_t
{
	DIV_ZERO = 0 // Division by zero.
} k_exception_t;

class kernel
{
private:
	const char *k_exceptions[1] = {
		"Division by zero"
	};
	
	device* devHello;

public:
	kernel()
	{
		devHello = new dev_hello();
	}

	int hello_init() {
		return devHello->init();
	}
	int hello_exit() {
		return devHello->exit();
	}

	// Maybe the error is because the enum??
	void panic(int exception)
	{
		printk("Kernel panic: %s\n\r", k_exceptions[exception]);
		for (;;)
			;
	}

	/*int printk(string fmt, initializer_list<string> argv) {
			//va_list argv;
			bool reading = false;
			int i = 0;
			//va_start(argv, fmt);

			while (fmt[i] != 0x00) {
				if (reading == true)
				{
					if (fmt[i] == 'i') {
						int i = va_arg(argv, int);
						cout << i;
					} else if (fmt[i] == 'c') {
						int c = va_arg(argv, int);
						cout << (char)c;
					} else if (fmt[i] == 's') {
						const char* s = va_arg(argv, const char*);
						cout << s;
					} else if (fmt[i] == 'f') {
						float f = va_arg(argv, double);
						cout << (float)f; // Will this work?
					}
					reading = false;
				} else if (fmt[i] == '%') {
					reading = true;
				} else
				{
					cout << fmt[i];
				}
				i++;
			}
			//va_end(argv);
			return 0;
		}*/

	int tty_write(unsigned ch, std::string buf, int count) { return 0; }

	int syscall(int p_syscall, int argc, char **argv) {
		printf("[C++] %d: %s", p_syscall, sys_call_name(p_syscall));
		for (int i = 0; i < argc; i++)
		{
			printf(" %s", argv[i]);
		}
		printf("\n");
		switch (p_syscall)
		{
		case sys_setup:
			break;
		case sys_exit:
			break;
		case sys_fork:
			break;
		case sys_read:
			break;
		case sys_write:
			break;
		case sys_open:
			break;
		case sys_close:
			break;
		case sys_waitpid:
			break;
		case sys_creat:
			break;
		case sys_link:
			break;
		case sys_unlink:
			break;
		case sys_execve:
			break;
		case sys_chdir:
			break;
		case sys_time:
			break;
		case sys_mknod:
			break;
		case sys_chmod:
			break;
		case sys_chown:
			break;
		case sys_break:
			break;
		case sys_stat:
			break;
		case sys_lseek:
			break;
		case sys_getpid:
			break;
		case sys_mount:
			break;
		case sys_umount:
			break;
		case sys_setuid:
			break;
		case sys_getuid:
			break;
		case sys_stime:
			break;
		case sys_ptrace:
			break;
		case sys_alarm:
			break;
		case sys_fstat:
			break;
		case sys_pause:
			break;
		case sys_utime:
			break;
		case sys_stty:
			break;
		case sys_gtty:
			break;
		case sys_access:
			break;
		case sys_nice:
			break;
		case sys_ftime:
			break;
		case sys_sync:
			break;
		case sys_kill:
			break;
		case sys_rename:
			break;
		case sys_mkdir:
			break;
		case sys_rmdir:
			break;
		case sys_dup:
			break;
		case sys_pipe:
			break;
		case sys_times:
			break;
		case sys_prof:
			break;
		case sys_brk:
			break;
		case sys_setgid:
			break;
		case sys_getgid:
			break;
		case sys_signal:
			break;
		case sys_geteuid:
			break;
		case sys_getegid:
			break;
		case sys_acct:
			break;
		case sys_phys:
			break;
		case sys_lock:
			break;
		case sys_ioctl:
			break;
		case sys_fcntl:
			break;
		case sys_mpx:
			break;
		case sys_setpgid:
			break;
		case sys_ulimit:
			break;
		case sys_uname:
			break;
		case sys_umask:
			break;
		case sys_chroot:
			break;
		case sys_ustat:
			break;
		case sys_dup2:
			break;
		case sys_getppid:
			break;
		case sys_getpgrp:
			break;
		case sys_setsid:
			break;
		default:
			break;
		}

		return 0;
	}
};

// Binding code
EMSCRIPTEN_BINDINGS(kernel_class)
{
	class_<kernel>("kernel")
		.constructor()
		.function("panic", &kernel::panic)
		.function("ttywrite", &kernel::tty_write)
		.function("hello_init", &kernel::hello_init)
		.function("hello_exit", &kernel::hello_exit)
		;
}

#ifdef __cplusplus
extern "C"
{
#endif

	EMSCRIPTEN_KEEPALIVE
	int syscall(kernel *pkernel, int p_syscall, int argc, char **argv)
	{
        return pkernel->syscall(p_syscall,argc,argv);
	}

#ifdef __cplusplus
}
#endif

#endif //!_KERNEL_H
