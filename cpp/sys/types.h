#ifndef _SYS_TYPES_H
#define _SYS_TYPES_H


#ifndef _TIME_T
#define _TIME_T
typedef long time_t;
#endif //!_TIME_T

#ifndef NULL
#define NULL ((void *) 0)
#endif //!NULL

typedef int pid_t;
typedef unsigned short uid_t;
typedef unsigned char gid_t;

#endif //!_SYS_TYPES_H