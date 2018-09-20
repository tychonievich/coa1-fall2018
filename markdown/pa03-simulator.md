---
title: Simulator
...

# Introduction

This will continue both your (a) implementation of a simulator and (b) coding for it
begun during [lab](lab04-simulator.html). It assumes you have understood that lab's content well.

# Simulator expansion

As with lab, edit `execute` only and access `R` and `M` in addition to local variables.

The behavior of all instructions, including those in lab, is given in the following table:

+----------+-------------------------------------------------------------------+
|`icode`   |Behavior                                                           |
+:========:+:==================================================================+
|   0      |`rA = rB`                                                          |
+----------+-------------------------------------------------------------------+
|   1      |`rA += rB`                                                         |
+----------+-------------------------------------------------------------------+
|   2      |`rA &= rB`                                                         |
+----------+-------------------------------------------------------------------+
|   3      |`rA =` read from memory at address `rB`                            |
+----------+-------------------------------------------------------------------+
|   4      |write `rA` to memory at address `rB`                               |
+----------+-------------------------------------------------------------------+
|   5      |do different things for different values of `b`:                   |
|          |                                                                   |
|          |+-----+-----------------------------------------------------------+|
|          ||`b`  |action                                                     ||
|          |+:===:+:==========================================================+|
|          || 0   |`rA = ~rA`                                                 ||
|          |+-----+-----------------------------------------------------------+|
|          || 1   |`rA = -rA`                                                 ||
|          |+-----+-----------------------------------------------------------+|
|          || 2   |`rA = !rA`                                                 ||
|          |+-----+-----------------------------------------------------------+|
|          || 3   |`rA = pc`                                                  ||
|          |+-----+-----------------------------------------------------------+|
+----------+-------------------------------------------------------------------+
|   6      |do different things for different values of `b`:                   |
|          |                                                                   |
|          |+-----+-----------------------------------------------------------+|
|          ||`b`  |action                                                     ||
|          |+:===:+:==========================================================+|
|          || 0   |`rA =` read from memory at `pc + 1`                        ||
|          |+-----+-----------------------------------------------------------+|
|          || 1   |`rA +=` read from memory at `pc + 1`                       ||
|          |+-----+-----------------------------------------------------------+|
|          || 2   |`rA &=` read from memory at `pc + 1`                       ||
|          |+-----+-----------------------------------------------------------+|
|          || 3   |`rA &=` read from memory at the address stored at `pc + 1` ||
|          |+-----+-----------------------------------------------------------+|
|          |                                                                   |
|          |In all 4 cases, increase `pc` by 2, not 1, at the end of this      |
|          |instruction                                                        |
+----------+-------------------------------------------------------------------+
|   7      |Compare `rA` (as an 8-bit 2's-complement number) to `0`;           |
|          |if `rA <= 0`, set `pc = rB`                                        |
|          |otherwise, increment `pc` like normal.                             |
+----------+-------------------------------------------------------------------+

Note: Python's syntax for `!x` is `not x` instead.

# Write a program in binary

Create a binary program that runs in this language as a file named `fib.binary`.
If should set memory at address `i` ≥ C0~16~ with the `i-0xC0`th Fibonacci number modulo 256
(note: the modulo will take care of itself because the simulator works with 1-byte values).
The file `fib.binary` itself must not be more than C0~12~ bytes long.

Once `0xC0` through `0xff` are set, halt by running an instruction with the `reserved` bit set.

It should be the case that running your simulator on `fib.binary` for several hundred cycles should result in output ending with the following:


    0xc0-cf: 01 01 02 03 05 08 0d 15 22 37 59 90 e9 79 62 db
    0xd0-df: 3d 18 55 6d c2 2f f1 20 11 31 42 73 b5 28 dd 05
    0xe0-ef: e2 e7 c9 b0 79 29 a2 cb 6d 38 a5 dd 82 5f e1 40
    0xf0-ff: 21 61 82 e3 65 48 ad f5 a2 97 39 d0 09 d9 e2 bb

# Submit

Submit your simulator as either a `.java` or `.py` file (any name is fine, but submit only one java/python file) and your program and `fib.binary`.

# Hints, tips, and suggestions


## Simulator building and testing


## Binary programming

We suggest following these steps, carefully, saving the result of each in a file so you can go back and fix them if they were wrong:

1. Write pseudocode that does the desired task
2. Convert any `for` loops to `while` loops with explicit counters
3. Change any `if` or `while` guards to the form `something <= 0`
4. Add more variables to split multi-operation lines into a series of single-operation lines
5. Add more operations to convert ones not in the instruction set into ones in the instruction set
6. Change each loop into a pair of instructions, opening with "`spot1` = `pc`" and closing with "if ..., goto `spot1`"
7. Count the number of variables needed
    - If it is ≤ 4, skip to step 10
    - else, continue with next step
8. Pick a memory address for each variable. Make these big enough your cod is unlikely to get that big; for example, you might pick `0x80` though `0x80` + number of variables
9. Convert each statement that uses variables into
    a. register ← load variable's memory
    b. original statement
    c. store variable's memory ← register
10. translate each instruction into numeric (`icode`, `a`, `b`) triples, possibly followed by a `M[pc+1]` immediate value
11. turn (`icode`, `a`, `b`) into hex
12. Write all the hex into `fib.binary`
