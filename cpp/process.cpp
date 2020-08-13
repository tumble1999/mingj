#ifndef _PROCESS_H_
#define _PROCESS_H_

#include <emscripten/bind.h>

#include "sys/types.h"

using namespace emscripten;

class process {
private:
	pid_t pid;
	pid_t ppid;
	time_t stime;
	unsigned int pgroup_id;
	unsigned int session_id;
	uid_t user_id;
	gid_t group_id;
public:
	process() {}
	~process(){}

	pid_t fork() {return 0;}
	int execve(std::string pathname, unsigned int argc, std::vector<std::string> argv) {return 0;}
	void exit(int status){}
};


// Binding code
EMSCRIPTEN_BINDINGS(process_class) {
  class_<process>("process")
    .function("fork", &process::fork)
    .function("execve", &process::execve)
    .function("exit", &process::exit)
	;
}
#endif //!_PROCESS_H_