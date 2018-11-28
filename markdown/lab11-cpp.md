---
title: Basic C++ Programming
...

The goal of this lab is to provide enough exposure to C++ that you understand how to explore more on your own.
It assumes you learned all of the topics in [last week's lab](lab10-cpp.html).

# Using `cout`

`printf` is complicated, with many arbitrary format codes and a high risk of a mismatch between format code and argument type.
C++ realized it could fix this using function overloading, and then added operator overloading to make it work even better.

## Task: implement an overload set of functions `display`

In a C++ file, create several functions named `display`, each taking a separate argument type and invoking `printf` with the appropriate format string. For example, one of them should be

````cpp
void display(int x) {
    printf("%d", x);
}
````

Also make three more `display` functions, one each for `const char *`, `double`, and `char`.

Once you are done, try running the following:

````cpp
int main() {
    display("The number ");
    display(3);
    display(" is ");
    display(1.5);
    display('*');
    display(2);
    display('\n');
}
````

## Task: wrap `FILE *` in a `class`

The `display` function above is nicer than raw `printf` in that the compiler enforces types
and we have no format strings to remember,
but it does not allow us to use it for multiple outputs.
We could add a `FILE *` argument to every function signature, but that's a lot of annoying extra typing.
Instead, let's wrap `FILE *` in a `class outf` so that we can write something like

````cpp
int main() {
    outf sout = outf(stdout); // constructor; no `new` means it's on the stack
    sout.display("The number ").display(3).display(" is ").display(1.5).display('*').display(2).display('\n');
}
````

Some observations:

- You'll need a constructor accepting a `FILE *`, and a `FILE *` attribute in the `class`

- You'll need `outf::display` to return a `outf&`{.cpp} (in particular, `return *this`{.cpp}) for this to work; otherwise we can't chain the `.display` calls like this

- Remember to make `display` `public:`{.cpp}

- Languages that do a lot of function chaining like this traditionally write one function per line, like
    
    ````cpp
    sout
        .display("The number ")
        .display(3)
        .display(" is ")
        .display(1.5)
        .display('*')
        .display(2)
        .display('\n')
        ;
    ````

## Task: change `sout::display` into an operator overload

All those `.display(...)`s clutter up the code. We could rename it something shorter like `d`, but that's still four characters every time (`.d(` and `)`). If we made `display` an operator, it would be even simpler.

Change your `outf`'s `display` function to be named `operator+`, `operator|`, or some other binary operator overload.
change your `main` to use this operator instead of explicit `display` calls, as e.g.

````cpp
    sout | "The number " | 3 | " is " | 1.5 | '*' | 2 | '\n';
````

You'll need to show your TA this code, so keep it in a file you can show them.

## Conversation

Should operator overloading be used to make common code require less characters to write?
Some say "yes, less writing = less bugs = better";
others say "if `+` sometimes means addition, and sometimes print, and sometimes append, and so on, that makes code hard to read."

No matter your opinion, operator overloading of this kind of integral to common C++:
the C++ header `#include <iostream>` gives you access to the `ostream` class
that is similar to (but much more complete than) our `fout` class
and overloads `<<` as this output operator.
It also defines a global object `std::cout` that is like the `sout` in our examples.
Thus, the typical C++ "hello, world" is

````cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
}
````

Note that C++ often uses the `std::endl`{.cpp} instead of `'\n'`{.cpp}.
It mostly means the same thing, but it also *flushes* the output stream,
which can both make code seem more responsive and slow down output^[In 2010, C++ luminary [Andrei Alexandrescu](http://erdani.org/) referred to "the C++ iostream endl fiasco" because it appears very few programmers understand the actual implications of flushing buffers].


# C++ Stack class

C++ ships with an extensive [standard library](https://en.wikipedia.org/wiki/C%2B%2B_Standard_Library) of data structures,
so good C++ code will rarely implement these structures manually.
However, a simple singly-linked stack will give a good testbed to trying out constructors and destructors.

I don't have a good read on how long this will take, so the TAs are authorized to change it's scope,
but I believe the following is a decent overview:
complete the following so that 

a. the `stack` destructor removes all of the remaining nodes
b. the `main` function displays
        
        81
        64
        49
        36
        25
        Remaining nodes: 5
        Remaining nodes: 0


````cpp
#include <stdio.h>

int allocated_nodes = 0;

// do not modify this class
class stack_node {
public:
    stack_node *next;
    int value;
    
    stack_node(int v, stack_node *n) : value(v), next(n) { allocated_nodes += 1; }
    ~stack_node() { allocated_nodes -= 1; }
};

// implement this class's unimplemented methods
class stack {
public:
    stack_node *head;

    stack() { head = NULL; }
    ~stack();
    
    void push(int value);
    int pop();
};

int main() {
    stack *a = new stack();
    for(int i=0; i<10; i+=1) a->push(i*i);
    for(int i=0; i<5; i+=1) printf("%d\n", a->pop());
    printf("Remaining nodes: %d\n", allocated_nodes);
    delete a;
    printf("Remaining nodes: %d\n", allocated_nodes);
}
````

# Pass-off

Show the TA's 

1. Your code for [Task: wrap `FILE *` in a `class`].
2. Your working [C++ Stack class], or progress thereunto.
