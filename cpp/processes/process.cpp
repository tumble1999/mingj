#ifndef _PROCESS_H
#define _PROCESS_H

// based off https://elixir.bootlin.com/linux/0.01/source/include/linux/sched.h#L77

#include "sys/types.h"

using namespace emscripten;

class process {
public:
	long state;
	long counter;
	long priotity;
	long signal;

	int exit_code;


	pid_t pid, parent;
	time_t stime;
	unsigned int pgroup_id;
	unsigned int session_id;
	uid_t user_id;
	gid_t group_id;

	int tty;
	
	process() {}
	~process(){}

	pid_t fork() {return 0;}
	int execve(std::string pathname, unsigned int argc, std::vector<std::string> argv) {return 0;}
	void exit(int status){}
};


#endif //!_PROCESS_H