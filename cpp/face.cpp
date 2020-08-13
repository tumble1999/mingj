#ifndef _FACE_H
#define _FACE_H
#include <emscripten/bind.h>

#include "process.cpp"

using namespace emscripten;

class Face {
private:
    std::string name;
public:
    Face(std::string name) {
        this->name = name;
    }

    std::string getName() {
        return name;
    }

	process createProcess() {
		return process();
	}
};

// Binding code
EMSCRIPTEN_BINDINGS(face_class) {
  class_<Face>("Face")
    .constructor<std::string>()
    .function("getName", &Face::getName)
    .function("createProcess", &Face::createProcess)
	;
}

#endif //!_FACE_H