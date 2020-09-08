#ifndef _FS_H
#define _FS_H

#include "kernel.h"
#include "device.h"
#include "sys/types.h"

struct file {
	mode_t f_mode;
	dev_t f_rdev;
	off_t f_pos;
	unsigned short f_flags;
	unsigned short f_count;
	unsigned short f_reada;
	struct file *f_next, *f_prev;
	struct node * f_inode;
	struct file_operations * f_op;
};

struct node {
	// dev_t		i_dev;
	// unsigned long	i_ino;
	// umode_t		i_mode;
	// nlink_t		i_nlink;
	// uid_t		i_uid;
	// gid_t		i_gid;
	dev_t		i_rdev;
	// off_t		i_size;
	// time_t		i_atime;
	// time_t		i_mtime;
	// time_t		i_ctime;
	// unsigned long	i_blksize;
	// unsigned long	i_blocks;
	// struct semaphore i_sem;
	// struct inode_operations * i_op;
	// struct super_block * i_sb;
	// struct wait_queue * i_wait;
	// struct file_lock * i_flock;
	// struct vm_area_struct * i_mmap;
	// struct inode * i_next, * i_prev;
	// struct inode * i_hash_next, * i_hash_prev;
	// struct inode * i_bound_to, * i_bound_by;
	// struct inode * i_mount;
	// struct socket * i_socket;
	// unsigned short i_count;
	// unsigned short i_flags;
	// unsigned char i_lock;
	// unsigned char i_dirt;
	// unsigned char i_pipe;
	// unsigned char i_seek;
	// unsigned char i_update;
	// union {
	// 	struct pipe_inode_info pipe_i;
	// 	struct minix_inode_info minix_i;
	// 	struct ext_inode_info ext_i;
	// 	struct ext2_inode_info ext2_i;
	// 	struct hpfs_inode_info hpfs_i;
	// 	struct msdos_inode_info msdos_i;
	// 	struct iso_inode_info isofs_i;
	// 	struct nfs_inode_info nfs_i;
	// 	struct xiafs_inode_info xiafs_i;
	// 	struct sysv_inode_info sysv_i;
	// 	void * generic_ip;
	// } u;
};

struct file_operations {
	struct module* owner;
	int FUNC_PTR(open,struct node*, struct file *);
	size_t FUNC_PTR(read,struct node *, struct file *, char *, int);
	size_t FUNC_PTR(write,struct node *, struct file *, char *, int);
	int FUNC_PTR(close,struct node *, struct file *);
};


int module::register_chrdev(int major, const char* name, struct file_operations* fops) {
	
	if(major >=MAX_CHRDEV){
		//TODO: Error code
		return -1;
	}
	if(m_kernel->get_chrdev(major)->fops){
		//TODO: Error code
		return -1;
	}
	//member access into incomplete type 'class kernel'
	m_kernel->get_chrdev(major)->name = name;
	m_kernel->get_chrdev(major)->fops = fops;
	//wouldnt kernal -> hello_mod -> fs -> kerbel make an include loop?
	
	return 0;
}
int module::unregister_chrdev(int major, const char* name) {
	if(major >= MAX_CHRDEV) {
		//TODO: Error code
		return -1;
	}
	if(!m_kernel->get_chrdev(major)->fops) {
		//TODO: Error code
		return -1;
	}
	if(strcmp(m_kernel->get_chrdev(major)->name,name)){
		//TODO: Error code
		return -1;
	}
	m_kernel->get_chrdev(major)->name = NULL;
	m_kernel->get_chrdev(major)->fops = NULL;
	return 0;
}



#endif //!_FS_H