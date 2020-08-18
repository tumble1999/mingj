//system call interface???

#ifndef _SCI_H
#define _SCI_H

#include <emscripten.h>
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <stdio.h>
#include <iostream>
#include <string.h>

#include "sys/types.h"
#include "sys/calls.h"

#include "kernel.h"

using namespace emscripten;

class system_call_interface
{
private:
public:
	system_call_interface() {}
	int syscall(int p_syscall, int argc, char **argv)
	{
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


#ifdef __cplusplus
extern "C" {
#endif

EMSCRIPTEN_KEEPALIVE
void syscall(kernel* pkernel, int p_syscall, int argc, char ** argv) {
	pkernel->get_sci()->syscall(p_syscall,argc,argv);
}


#define SYS(X,...) syscall(,sys_call::X,__VA_ARGS__)

#ifdef __cplusplus
}
#endif


#endif //!_SCI_H