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

# Write a program in binary

Create a binary program that runs in this language as a file named `fib.binary`.
If should set memory at address `i` with the `i-0x40`th Fibonacci number modulo 256
(note: the modulo will take care of itself because the simulator works with 1-byte values).
The file `fib.binary` itself must not be more than 40 bytes long.

Once `0x40` through `0xff` are set, halt by running an instruction with the `reserved` bit set.

It should be the case that running your simulator on `fib.binary` for several hundred cycles should result in output ending with the following:


    0x40-4f: 01 01 02 03 05 08 0d 15 22 37 59 90 e9 79 62 db 
    0x50-5f: 3d 18 55 6d c2 2f f1 20 11 31 42 73 b5 28 dd 05 
    0x60-6f: e2 e7 c9 b0 79 29 a2 cb 6d 38 a5 dd 82 5f e1 40 
    0x70-7f: 21 61 82 e3 65 48 ad f5 a2 97 39 d0 09 d9 e2 bb 
    0x80-8f: 9d 58 f5 4d 42 8f d1 60 31 91 c2 53 15 68 7d e5 
    0x90-9f: 62 47 a9 f0 99 89 22 ab cd 78 45 bd 02 bf c1 80 
    0xa0-af: 41 c1 02 c3 c5 88 4d d5 22 f7 19 10 29 39 62 9b 
    0xb0-bf: fd 98 95 2d c2 ef b1 a0 51 f1 42 33 75 a8 1d c5 
    0xc0-cf: e2 a7 89 30 b9 e9 a2 8b 2d b8 e5 9d 82 1f a1 c0 
    0xd0-df: 61 21 82 a3 25 c8 ed b5 a2 57 f9 50 49 99 e2 7b 
    0xe0-ef: 5d d8 35 0d 42 4f 91 e0 71 51 c2 13 d5 e8 bd a5 
    0xf0-ff: 62 07 69 70 d9 49 22 6b 8d f8 85 7d 02 7f 81 00 

# Submit

Submit your simulator as either a `.java` or `.py` file (any name is fine, but submit only one java/python file) and your program and `fib.binary`.
