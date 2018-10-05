---
title: Assembly
...

# Introduction

In this assignment you need to write x86-64 assembly by hand.
This is not something most programmers do often, but when it comes up in the workplace
being one of the few there who can do it will help your company and make you shine.

Write your code in a file named `matlib.s`.
We provide a base file that includes the input and output interaction (in `main` and `printNum`) to test the code you will write: [`matlib.s`](files/matlib.s).
Write your code where the comments say "TO DO: write this function".

# Work with NX

You don't have to do this, but we strongly recommend you work with NX throughout this assignment.

1. Log in to NX (see [lab 01](lab01-shell.html) for a reminder on how to do this).
2. Open a terminal
3. Use [the modules tool] to get access to an assembler by typing

        module load clang-llvm

4. We suggest using a terminal-based editor.
    `nano` is easy to learn because it lists its own keyboard shortcuts at the bottom of the screen (note it uses `^` to mean "while pressing the control key").
    `emacs` is more involved to learn, but also more powerful.
    `vim` is a modal editor that is even harder to learn, but those who learn it tend to revere with almost religious passion.
    
{.aside ...}
Why a terminal-based editor?

It is common to interact with servers that do not have their own monitors.
In these cases, you typically attach to the server via `ssh`
and have access only to a terminal, not a full windowing environment.
The more comfortable you are with doing common programming tasks in the terminal,
the better these experiences will be.
{/}

# Write two functions

In AT\&T syntax x86-64 assembly, write two routines:
one that computes the product of two numbers, and one that computes the power of two numbers.

It should be possible to assemble your code by typing `clang matlib.s`
and that should result in a file, `a.out`, that can be run by by typing `./a.out`.
When run, it should ask for two integers and display their product and exponent.

## Product

The first subroutine, `product`,
should compute and return the product of the two integer arguments.
It **must not use** multiplication or division instructions.
It must compute this **iteratively**, not recursively.

{.example ...}
There are other correct solutions,
but a simple one might follow an approach like the following pseudo-code:

    function product(x, y)
        z = 0
        while y > 0 repeat
            z += x
            y -= 1
        end while
        return z
    end function

There is also a much more efficient solution family making use of bit shifts.
{/}

You may assume that both of the parameters are positive integers
(i.e., neither negative or zero)
and that the result can fit in a single 64-bit register.

## Power

The second subroutine, `power`,
should compute and return the its first argument raised to the power of its second argument.
It **must use** the `product` routine you wrote to do this,
not x86-64 multiplication instructions or other routines you did not write.
It must compute this **recursively**, not iteratively.

{.example ...}
There are other correct solutions,
but a simple one might follow an approach like the following pseudo-code:

    function power(x, y)
        if y == 1 then
            return x
        else
            return product(x, power(x, y-1))
        end if
    end function
{/}

You may assume that both of the parameters are positive integers
(i.e., neither negative or zero)
and that the result can fit in a single 64-bit register.


# Submit

Submit your assembly as `matlib.s`.
