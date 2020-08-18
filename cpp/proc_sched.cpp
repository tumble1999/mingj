#ifndef _PROC_SCHED_H
#define _PROC_SCHED_H

#include "process.cpp"
#include "sci.h"

//based off of https://elixir.bootlin.com/linux/0.01/source/kernel/sched.c

class proc_sched {
private:
	process current;
public:
	proc_sched(){
		
	};
};

#endif //!_PROC_SCHED_H