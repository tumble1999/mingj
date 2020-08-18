#ifndef _KERNEL_H
#define _KERNEL_H

//based off https://elixir.bootlin.com/linux/0.01/source/include/linux/kernel.h

//#include <emscripten.h>
#include <emscripten/bind.h>
#include <stdio.h>
#include <iostream>
#include <string.h>

#define printk(fmt,...) printf(fmt,__VA_ARGS__)

using namespace emscripten;
using namespace std;

typedef enum k_exception_t {
	DIV_ZERO = 0 // Division by zero.
} k_exception_t;

class kernel {
	private:
		const char* k_exceptions[1] = {
			"Division by zero"
		};

		system_call_interface* sci;

	public:
		kernel():sci(new system_call_interface()){}

		system_call_interface* get_sci() {
			return this->sci;
		}

		// Maybe the error is because the enum??
		void panic(int exception) {
			printk("Kernel panic: %s\n\r", k_exceptions[exception]);
			for (;;);
		}

		/*int printk(string fmt, initializer_list<string> argv) {
			//va_list argv;
			bool reading = false;
			int i = 0;
			//va_start(argv, fmt);

			while (fmt[i] != 0x00) {
				if (reading == true)
				{
					if (fmt[i] == 'i') {
						int i = va_arg(argv, int);
						cout << i;
					} else if (fmt[i] == 'c') {
						int c = va_arg(argv, int);
						cout << (char)c;
					} else if (fmt[i] == 's') {
						const char* s = va_arg(argv, const char*);
						cout << s;
					} else if (fmt[i] == 'f') {
						float f = va_arg(argv, double);
						cout << (float)f; // Will this work?
					}
					reading = false;
				} else if (fmt[i] == '%') {
					reading = true;
				} else
				{
					cout << fmt[i];
				}
				i++;
			}
			//va_end(argv);
			return 0;
		}*/

		int tty_write(unsigned ch, std::string buf, int count) {return 0;}
};



// Binding code
EMSCRIPTEN_BINDINGS(kernel_class) {
  class_<kernel>("kernel")
  	.constructor()
    .function("panic", &kernel::panic)
    .function("ttywrite", &kernel::tty_write)
	;
}

#endif //!_KERNEL_H
