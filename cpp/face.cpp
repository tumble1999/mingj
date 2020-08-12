#include <emscripten/bind.h>

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
};

// Binding code
EMSCRIPTEN_BINDINGS(face_class) {
  class_<Face>("Face")
    .constructor<std::string>()
    .function("getName", &Face::getName)
	;
}