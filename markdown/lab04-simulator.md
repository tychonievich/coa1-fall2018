---
title: Simulator
...

# Introduction

As discussed in class, register-transfer level design can be relatively simply described as

1. clock signal has a rising edge
2. register outputs change
3. logic works, which can be thought of as arbitrary acyclic code that assigns each variable only once
4. logic results in register inputs changing
5. repeat

In this lab, and the subsequent programming assignment, you will expand on these basic pieces to build your own machine simulator and write binary code for it.

# Getting the simulator skeleton

We've written a basic simulator in [python (sim_base.py)](files/sim_base.py) and [java (SimBase.java)](files/SimBase.java).
This works from a command-line interface, expecting memory byte values (either directly or in a file) as a command-line argument:

````sh
# runs SimBase in java with 8 bytes of memory set
javac SimBase.java
java SimBase 01 23 45 67 89 ab cd ef
````

````sh
# runs SimBase in python with 8 bytes of memory set
python3 sim_base.py 01 23 45 67 89 ab cd ef
````

````sh
# runs SimBase using the contents of memory.txt to set memory
python3 sim_base.py memory.txt
java SimBase memory.txt
````

Memory contents must be specified in hexadecimal bytes, separated by whitespace.

# Adding features

Each file begins with a function or method named `execute` which is given two arguments (the current instruction in `ir` and the PC of this instruction in `oldPC`) and returns one value (the `pc` to execute next).
The skeleton code just returns `oldPC + 1`.

Each file also has two global values you can access: `R`, an array of 4 register values, and `M`, an array of 256 memory values.

We also provide a helper function for getting a range of bits from a number.

Add code to `execute` (do not edit other parts of the file) to do the following:

## Separate the instruction into parts

Treat the instruction as having four parts:

--------------------------------------------------------------------------------
bits    name        meaning
------  ----------  ------------------------------------------------------------
7       reserved    If set, an invalid instruction.
                    Do not do work or advance the PC if this bit is 1.

[4, 7)  `icode`     Specifies what action to take

[2, 4)  `a`         The index of a register

[0, 2)  `b`         The index of another register, or details about icode
--------------------------------------------------------------------------------

Change `execute` to do different things for different `icode`s, as follows:

## Halt

If `reserved` is 1, set the next PC to the current PC instead of advancing it and do nothing else.

Using these pieces, run your simulator with initial memory that will cause it to do advance to `pc` 3 and then stay there.

## Move

Let `rA` be register indicated by `a` and `rB` be the register indicated by `b`.
Do the following actions for the following `icode`s:

 `icode`    Action
---------   -----------------------------------------------------
    0       move `rB` into `rA`
    3       move from memory at address `rB` into `rA`
    4       move from register `rA` into memory at address `rB`
    6       move from the memory cell after `pc` into `rA`, and increase the `pc` by 2 instead of 1

Using these pieces, run your simulator with initial memory that will cause it to do the following:

1. put 0x23 into register 2
2. copy register 2 into register 1
3. put register 1's contents into memory at address 0x20


## Math

Let `rA` be register indicated by `a` and `rB` be the register indicated by `b`.
Do the following actions for the following `icode`s:

 `icode`    Action
---------   -----------------------------------------------------
    1       `rA += rB`
    2       `rA &= rB`

Using these pieces, run your simulator with initial memory that will cause it to do the following:

1. put the sum of memory at address 0x10 and memory at address 0x11 into memory at address 0x12 

Your initial memory should have non-zero values in 0x10 and 0x11 so the behavior of this program can be seen.

# Check-off

To check-off this lab, show a TA your simulator and the memory contents that do the tasks listed above.

