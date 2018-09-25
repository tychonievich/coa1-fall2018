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
|          || 3   |`rA =` read from memory at the address stored at `pc + 1`  ||
|          |+-----+-----------------------------------------------------------+|
|          |                                                                   |
|          |In all 4 cases, increase `pc` by 2, not 1, at the end of this      |
|          |instruction                                                        |
+----------+-------------------------------------------------------------------+
|   7      |Compare `rA` (as an 8-bit 2's-complement number) to `0`;           |
|          |if `rA <= 0`, set `pc = rB`                                        |
|          |otherwise, increment `pc` like normal.                             |
+----------+-------------------------------------------------------------------+

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

## Language nuances

Python's syntax for `!x` is `not x` instead.

Java treats bytes (like `R[i]`) as signed integers, not unsigned.
That means they are not good indices (e.g., `M[R[i]]` might throw an exception if `R[i]` is negative).
However, `R[i] & 0xFF` treats it as unsigned instead,
so `M[R[i] & 0xFF]` should work.


## Simulator building and testing

Try making a minimal program to test each instruction.
Typically this will involve a few (`icode`=6, `b`=0) instructions to put numbers into registers
and then the instruction you want to test.
Unless of course no registers are needed...

For example,
    
- to test instruction 7,
    
    The following should not jump, so three steps should end up with the PC at address 5, not 20:
    
    pseudocode                  parts           bytes
    --------------------------  ------------    -------------
    R~0~ = 10                   (6, 0, 0) 10    60 0A
    R~1~ = 20                   (6, 1, 0) 20    64 14
    if R~0~ <= 0, jump to R~1~  (7, 0, 1)       71

    The following should jump, so three steps should end with the PC at address 20, not 5:
        
    pseudocode                  parts           bytes
    --------------------------  ------------    -------------
    R~0~ = −10                  (6, 0, 0) −10   60 F6
    R~1~ = 20                   (6, 1, 0) 20    64 14
    if R~0~ <= 0, jump to R~1~  (7, 0, 1)       71

- to test instruction 6.3,
    
    The following should load 20 into R~1~
    
    pseudocode                  parts           bytes
    --------------------------  ------------    -------------
    R~2~ = 10                   (6, 2, 0) 10    68 0A
    R~3~ = 20                   (6, 3, 0) 20    6C 14
    write R~3~ to address R~2~  (4, 3, 2)       4E
    read address 10 into R~1~   (6, 1, 3) 10    67 0A
    
    You could also do this without using instruction 4
    by setting enough memory that there was already data in address 10:
    
    pseudocode                      parts           bytes
    ----------------------------    ------------    ------------------------
    read address 10 into R~1~       (6, 1, 3) 10    67 0A
    intialize address 10 with 20    0s, then 20     00 00 00 00 00 00 00 14
    
    
Etc.

## Binary programming

You may use [our visual simulator](files/toy-isa-sim.html) if you are unsure of the quality of your own. It lets you manually edit memory or upload memory files, and uses green highlights to show what was read, orange to show what was written.

We suggest following these steps, carefully, saving the result of each in a file so you can go back and fix them if they were wrong:

1. Write pseudocode that does the desired task
2. Convert any `for` loops to `while` loops with explicit counters
3. Change any `if` or `while` guards to the form `something <= 0`
    - `a <= b` becomes `a-b <= 0`
    - `a < b` becomes `a+1 <= b` becomes `a+1-b <= 0`
    - `a >= b` becomes `0 >= b-a` becomes `b-a <= 0`
    - `a > b` becomes `0 > b-a` becomes `b+1-a <= 0`
    - `a == b` becomes `a-b == 0` becomes `!(a-b) == 1` becomes `!!(a-b) <= 0`
    - `a != b` becomes `a-b != 0` becomes `!(a-b) == 0` becomes `!(a-b) <= 0`
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

Debugging binary is hard. That's part of why we don't generally write code in binary. If you get stuck, you should probably try pulling just the part you are stuck on separate from the rest and test it until it works, then put it back in the main solution.
