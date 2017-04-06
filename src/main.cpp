#include <iostream>

#include <lib/glfw/include/GLFW/glfw3.h>

#include <lib/asserter/src/test.h>

int main(int argc, const char * argv[]) 
{
	ASSERT(	GL_VERSION );
	std::cout << "ok" << std::endl; 
}