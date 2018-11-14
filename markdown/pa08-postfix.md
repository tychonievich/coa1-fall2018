---
title: Postfix calculator
...

In this assignment you will implement a [reverse polish notation calculator](http://en.wikipedia.org/wiki/Reverse_Polish_notation),
also known as a postfix notation calculator.
That article also gives pseudocode for two algorithms; the left-to-right is probably a better match for line-by-line input, though you are welcome to read the full input and then run right-to-left algorithm (or any other correct algorithm you might design) if you'd prefer.

Your program (written in a file named `rpn.c`)
should read `stdin` until either (a) it encounters an unknown token or (b) there is nothing left.
It should split the input into tokens on whitespace (as defined by `isspace` in `<ctype.h>`),
recognizing the four operators `+`, `-`, `*`, and `/`
as well as integer literals.

Your program should halt when it

- encounters an unrecognized literal
- reaches the end of the input
- is given an operator with insufficient operands to evaluate it

Before exiting for any of the above reasons, your program must print the remaining values on the stack.
Optionally, your program may print the contents of the stack every time it changes.

{.example ...}
The following is one possible run of the program, with the optional print-stack feature included
<pre><code>
<ins>2 3</ins>
[ 2 ]
[ 2, 3 ]
<ins>4     - 5</ins>
[ 2, 3, 4 ]
[ 2, -1 ]
[ 2, -1, 5 ]
<ins>+ * /</ins>
[ 2, 4 ]
[ 8 ]
</code></pre>
Note that the program stopped when it encountered `/` on a stack with just one argument.
{/}

{.example ...} The following is one possible run of the program, with the optional print-stack feature not included
<pre><code>
<ins>2</ins>
<ins>  3 -4 + end 5 4</ins>
[ 2, -1 ]
</code></pre>
Note that the program stopped when it encountered `end` and did not continue running the `5` and `4`.
{/}

