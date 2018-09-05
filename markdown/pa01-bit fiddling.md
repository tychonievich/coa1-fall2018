---
title: Bit fiddling homework
...

> This is a working draft of the homework description, and is likely to change.

# Overview

This homework will give you a chance to practice using binary and bit-wise operators.
You'll likely find [Booleans §4](bool.html) a useful reference.

# Task

Visit <https://archimedes.cs.virginia.edu/coa1-f2018/pa01.php>
and complete at least 80% of the problems there.
The text boxes want lightweight code using just operators and assignments, like

````c
x = 0x20
y = b + x
````

The goal is to end up with one variable having a particular value,
based on other variables that are provided with new values in each test case.
Do not add conditionals, loops, subroutines, etc.

# Collaboration

You may work with other students on this assignment, but only in the following two ways:

1. You worked together from the beginning, solving the problem as a team, with each person contributing.
    
    Each teammate should cite this in each problem with a C-style comment at the top of each solution
    and also cite the originator of any single-person contributions where they appear, like
    
    ````c
    // Part of a team with mst3k and lat7h
    x = -y
    w = -x // lat7h came up with this line
    z = x + y
    ````
    

2. You helped someone with a task you'd already finished, helping them think through their incorrect solution and not giving them or trying to lead them to your solution.

    The helper should acknowledge they did this by returning to their previously-submitted solutions
    and re-submitting them with an added comment at the top, like
    
    ````c
    // I helped tj1a
    x = -y
    w = -x
    ````
    
    The helpee should acknowledge they got this by adding a comment at the top, like
    
    ````c
    // tj1a helped me
    x = -y
    w = -x
    ````
    
In all cases, include computing IDs in your citations to streamline our automated tools that assist with collaboration checking.
