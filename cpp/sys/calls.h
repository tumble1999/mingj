#ifndef _SYS_CALLS_H
#define _SYS_CALLS_H

#include <string.h>

enum sys_call
{
	sys_setup,
	sys_exit,
	sys_fork,
	sys_read,
	sys_write,
	sys_open,
	sys_close,
	sys_waitpid,
	sys_creat,
	sys_link,
	sys_unlink,
	sys_execve,
	sys_chdir,
	sys_time,
	sys_mknod,
	sys_chmod,
	sys_chown,
	sys_break,
	sys_stat,
	sys_lseek,
	sys_getpid,
	sys_mount,
	sys_umount,
	sys_setuid,
	sys_getuid,
	sys_stime,
	sys_ptrace,
	sys_alarm,
	sys_fstat,
	sys_pause,
	sys_utime,
	sys_stty,
	sys_gtty,
	sys_access,
	sys_nice,
	sys_ftime,
	sys_sync,
	sys_kill,
	sys_rename,
	sys_mkdir,
	sys_rmdir,
	sys_dup,
	sys_pipe,
	sys_times,
	sys_prof,
	sys_brk,
	sys_setgid,
	sys_getgid,
	sys_signal,
	sys_geteuid,
	sys_getegid,
	sys_acct,
	sys_phys,
	sys_lock,
	sys_ioctl,
	sys_fcntl,
	sys_mpx,
	sys_setpgid,
	sys_ulimit,
	sys_uname,
	sys_umask,
	sys_chroot,
	sys_ustat,
	sys_dup2,
	sys_getppid,
	sys_getpgrp,
	sys_setsid
};

const char *sys_call_name(int p_syscall)
{
	switch (p_syscall)
	{
	case sys_setup:
		return "sys_setup";
	case sys_exit:
		return "sys_exit";
	case sys_fork:
		return "sys_fork";
	case sys_read:
		return "sys_read";
	case sys_write:
		return "sys_write";
	case sys_open:
		return "sys_open";
	case sys_close:
		return "sys_Close";
	case sys_waitpid:
		return "sys_waitpid";
	case sys_creat:
		return "sys_creat";
	case sys_link:
		return "sys_link";
	case sys_unlink:
		return "sys_unlink";
	case sys_execve:
		return "sys_execve";
	case sys_chdir:
		return "sys_chdir";
	case sys_time:
		return "sys_time";
	case sys_mknod:
		return "sys_mknod";
	case sys_chmod:
		return "sys_chmod";
	case sys_chown:
		return "sys_chown";
	case sys_break:
		return "sys_break";
	case sys_stat:
		return "sys_stat";
	case sys_lseek:
		return "sys_lseek";
	case sys_getpid:
		return "sys_getpid";
	case sys_mount:
		return "sys_mount";
	case sys_umount:
		return "sys_umount";
	case sys_setuid:
		return "sys_setuid";
	case sys_getuid:
		return "sys_getuid";
	case sys_stime:
		return "sys_stime";
	case sys_ptrace:
		return "sys_ptrace";
	case sys_alarm:
		return "sys_alarm";
	case sys_fstat:
		return "sys_fstat";
	case sys_pause:
		return "sys_pause";
	case sys_utime:
		return "sys_utime";
	case sys_stty:
		return "sys_stty";
	case sys_gtty:
		return "sys_gtty";
	case sys_access:
		return "sys_access";
	case sys_nice:
		return "sys_nice";
	case sys_ftime:
		return "sys_ftime";
	case sys_sync:
		return "sys_sync";
	case sys_kill:
		return "sys_kill";
	case sys_rename:
		return "sys_rename";
	case sys_mkdir:
		return "sys_mkdir";
	case sys_rmdir:
		return "sys_rmdir";
	case sys_dup:
		return "sys_dup";
	case sys_pipe:
		return "sys_pipe";
	case sys_times:
		return "sys_times";
	case sys_prof:
		return "sys_prf";
	case sys_brk:
		return "sys_brk";
	case sys_setgid:
		return "sys_setgid";
	case sys_getgid:
		return "sys_getgid";
	case sys_signal:
		return "sys_signal";
	case sys_geteuid:
		return "sys_geteuid";
	case sys_getegid:
		return "sys_getegid";
	case sys_acct:
		return "sys_acct";
	case sys_phys:
		return "sys_phys";
	case sys_lock:
		return "sys_lock";
	case sys_ioctl:
		return "sys_ioctl";
	case sys_fcntl:
		return "sys_fcntl";
	case sys_mpx:
		return "sys_mpx";
	case sys_setpgid:
		return "sys_setpgid";
	case sys_ulimit:
		return "sys_sulimit";
	case sys_uname:
		return "sys_uname";
	case sys_umask:
		return "sys_umask";
	case sys_chroot:
		return "sys_chroot";
	case sys_ustat:
		return "sys_ustat";
	case sys_dup2:
		return "sys_dup2";
	case sys_getppid:
		return "sys_getppid";
	case sys_getpgrp:
		return "sys_getpgro";
	case sys_setsid:
		return "sys_setsid";
	default:
		return "sys_null";
	}
}

#endif //!_SYS_CALLS_H