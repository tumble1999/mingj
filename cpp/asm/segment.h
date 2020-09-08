#ifndef _ASM_SEGMENT_H
#define _ASM_SEGMENT_H

//https://www.ibm.com/developerworks/library/l-basics-inline-assembly/index.html

#include <stdio.h>

struct __segment_dummy { unsigned long a[100]; };
#define __sd(x) ((struct __segment_dummy *) (x))
#define __const_sd(x) ((const struct __segment_dummy *) (x))

static inline void __put_user(unsigned long x, void * y, int size)
{
	switch (size) {
		case 1:
			__asm__ ("movb %b1,%%fs:%0"
				:"=m" (*__sd(y))
				:"ir" ((unsigned char) x), "m" (*__sd(y))); // should be "iq" but you get "error: invalid input constraint 'iq' in asm"
			break;
		case 2:
			__asm__ ("movw %w1,%%fs:%0"
				:"=m" (*__sd(y))
				:"ir" ((unsigned short) x), "m" (*__sd(y)));
			break;
		case 4:
			__asm__ ("movl %1,%%fs:%0"
				:"=m" (*__sd(y))
				:"ir" (x), "m" (*__sd(y)));
			break;
		default:
			printf("bad_user_access_length executed");
	}
}

static inline unsigned long __get_user(const void * y, int size)
{
	unsigned long result;

	switch (size) {
		case 1:
			__asm__ ("movb %%fs:%1,%b0"
				:"=r" (result)     // should be "=q" but you get "error: invalid output constraint '=q' in asm"
				:"m" (*__const_sd(y)));
			return (unsigned char) result;
		case 2:
			__asm__ ("movw %%fs:%1,%w0"
				:"=r" (result)
				:"m" (*__const_sd(y)));
			return (unsigned short) result;
		case 4:
			__asm__ ("movl %%fs:%1,%0"
				:"=r" (result)
				:"m" (*__const_sd(y)));
			return result;
		default:
			return printf("bad_user_access_length executed");
	}
}

#define get_fs_byte(addr) __get_user((const unsigned char *)(addr),1)
#define get_fs_word(addr) __get_user((const unsigned short *)(addr),2)
#define get_fs_long(addr) __get_user((const unsigned int *)(addr),4)

#define put_fs_byte(x,addr) __put_user((x),(unsigned char *)(addr),1)
#define put_fs_word(x,addr) __put_user((x),(unsigned short *)(addr),2)
#define put_fs_long(x,addr) __put_user((x),(unsigned int *)(addr),4)

#endif /* _ASM_SEGMENT_H */