---
title: Debugger lab
...


Some terminology:

- `lldb` is a command-line debugger
- "LLVM" is the compiler framework that includes many things,  including the `clang` compiler that we are using, as well as `lldb`
- `gdb` is the debugger that was used in the past, and is often used elsewhere -- it is analogous to `lldb` in how it works


# What is a Debugger?

A debugger is a utility program that allows you to run a program under development while controlling its execution and examining the internal values of variables.
We think of a program running "inside" a debugger.
The debugger allows us to control the execution of the program by pausing its execution and then resuming it.
While paused, we can find out where we are in the program, what values variables have, reset the values of variables, etc.
If a program crashes, the debugger can tell you exactly *where* the program crashed.
The principles and commands described in this document are specific to the lldb debuggers under UNIX, but every debugger has similar commands.

# Compiling for Debugging

We'll use debuggers initially on binary files.
When using them on code you wrote, you want to compile with the `-g` flag to enable debugging symbols, which will make the debugger much more useful.

# How to Start Using `lldb` in NX

1. Log into NX and open a terminal
2. Enable clang-llvm with `module load clang-llvm`
2. Enable the ghex hex editor with `module load ghex`
3. Invoke with `lldb program_to_debug`

The following sections describe the important types of things you can do with `lldb`,
organized by "category" of activity.


## Useful commands

The following all assume you are in a debugger

### Commands controlling running

Command             Meaning
------------------- ----------------------------------------------------------
`run`               (re)start the program
`run x y z`         (re)start the program with command line arguments `x`, `y`, and `z`
`step`              step one source-code-line forward, entering functions if stepping on `call`
`next`              step one source-code-line forward, skipping to return if stepping on `call`
`stepi`             step one ISA-instruction forward, entering functions if stepping on `call`
`nexti`             step one ISA-instruction forward, skipping to return if stepping on `call`
`finish`            run until the next `return`
`continue`          resume running after run was interrupted (e.g., after a breakpoint or `step`).
`exit`              leave the debugger


You might also want to use Ctrl+C to interrupt a program if it is running too long (this works on the command line for programs run without a debugger too).


### Commands controlling break points

A *break point* is a program location where the debugger pauses when running so you can see what's around it.

When `run`, the debugger pauses right *before* executing the code on which you place a breakpoint.

Command             Meaning
------------------- ----------------------------------------------------------
`br set -n main`    set a breakpoint on the first line of `main`
`br foo.c:23`       set a breakpoint on the line 23 of `foo.c` (must be a line with code, not a comment, blank line, etc)
`br list`           list all breakpoints
`br delete 1`       delete breakpoint number 1 (as indicated in the list)

### Looking around

Command                     Meaning
-------------------         ----------------------------------------------------------
`bt`                        show a `backtrace`: a list of `call`s used to reach here
`frame info`                show information about the current stack frame
`up`                        select the stack frame of the caller of the current stack frame
`down`                      undo a previous `up`
`register read`             show the contents of the program registers
`register read --format i`  show the contents of the program registers, formated as signed integers
`register read rax rdx`     show the contents of `rax` and `rdx` (only)
`me rea -s4 -fx -c8 0x1234`  `me`mory `rea1d, with a `c`ount of 8 values, each value's `s`ize being 4 bytes, `f`ormated in he`x`adecimal, from address `0x1234`
`di -f`                     `diassemble` the code for the current call `f`rame.
`di -n main`                `diassemble` the code for the function `name`ed `main`
`di -n main -b`             `diassemble` the code for the function `name`ed `main`, with byte encoding of instructions included
`di -s 0x1234 -c 20`        `diassemble` 20 bytes starting at address `0x1234`

# Example: debugging `cmdadd`

See the [cmdadd example](cmdadd.html) file for a detailed walkthrough.

# Task: debug `recfib`

The program [`recfib`](files/recfib) is supposed to print out the *n*th Fibonacci number, where *n* is provided on the command line, as e.g.

    ./recfib 0
    The 0th Fibonacci number is 1
    
    ./recfib 4
    The 4th Fibonacci number is 5
    
    ./recfib 6
    The 6th Fibonacci number is 13

However, the program crashes when run because it has a bug in the recursive computation.

Your task: use `lldb` to find the bug, then use `ghex` to fix it.

Note: the simplest fix (though not the only one) involves changing the conditions of a jump. There are multiple encodings of jumps, but the most common is a two-byte encoding, where the second byte is a relative offset and the first byte indicates the condition of the jump:

Instruction First byte of "short jump" operation
----------- ------------------------------------
`je`        `74`
`jne`       `75`
`jl`        `7C`
`jge`       `7D`
`jle`       `7E`
`jg`        `7F`


We compiled `recfib` with the `-g` flag, so you'll see some source code as well as assembly.

# Check-off

To check-off this lab, show a TA your working code.
The TA may also request that you discuss how you used the debugger to solve the problem
and/or that you do a few simple debugger actions for them.

