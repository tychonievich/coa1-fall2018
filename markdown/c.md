---
title: C, a guide and reference
...

This is intended to be a practical guide (rather than an authoritative guide) to C,
as implemented by clang and gcc for the x86-64 processor family.

# Data Types

The `sizeof(...)` operator returns the size of a type in bytes.
Thus, `sizeof(int)`{.c} is `4`, not `32`.

## Primitive

### Integer

The integer data types are

name            bits        representation              notes
--------------- ----------- --------------------------  ------------------------------------
`_Bool`         1 or more   undefined                   rarely used; for all types, `0` is false, anything else is true
`char`          8           signedness undefined        usually used for characters, sometimes for bytes
`signed char`   8           2's complement
`unsigned char` 8           unsigned integer
`short`         16          2's complement
`int`           32          2's complement
`long`          32 or 64    2's complement              32 bits if compiled in 32-bit mode; for 64-bit, add the `-m64` flag when compiling
`long long`     64          2's complement

Each has an `unsigned` version (e.g., `unsigned short`, etc). If `unsigned` is used as a type by itself, it means `unsigned int`.

Integer literals will be implicitly cast to the correct type upon assignment;
thus `char x = -3`{.c} will turn `-3` into an 8-bit value automatically,
as `int x = 'x'`{.c} will turn `'x'` into a 32-bit value.
This only works up to int-sized literals.

To force a literal to be long add a `l` or `L` to the end; to force it to be unsigned add a `u` or `U`.
This is generally only needed for very large constants, like `unsigned long very_big = 9223372036854775808ul`{.c}.

Character literals are integer literals written with a different syntax.
There is no significant difference between `'0'` and `48` other than legibility.

### Floating-point

The floating-point datatypes are

name            exponent bits   fraction bits   total size              literal syntax
--------------- --------------- --------------- ---------------------   ------------------------------------
`float`         8               23              32 bits (4 bytes)       `3.1415f` -- `f` or `F` for `float`
`double`        11              52              64 bits (8 bytes)       `3.1415`  -- no suffix
`long double`   15              64              80 bits (10 bytes)      `3.1415l` -- `l` or `L` for `long`

Note that `long double` has traditionally only differed from `double` on x86 architectures.

### Enumerations

The `enum` keyword is a special way of defining named integer constants,
typically in ascending order unless otherwise specified.

````c
enum colors { a, b, c, d=100, e };
/* a is 0, b is 1, c is 2, d is 100, and e is 101 */

int f = e; /* equivalent to f = 101 */
````

### void and casting

There is also a special `void` type that means "a byte with no known meaning."

Casting between integer types truncates (if going smaller) or zero- or sign-extends (if going larger, depending on the signedness of the value) to fit the available space.
Casting to or from floating-point types converts to a nearby^[Oddly, not always *the* nearest value; floating-point numbers use a "round to even" rule that sometimes rounds in a different direction than you expect in order to get the last bit of the fraction to be a `0`.] representable value (which may be infinity),
with the exception that casting from float to int truncates the reminder instead of rounding.

## Pointers

For every type, there is a type for a pointer to a value of that type.
These are written with a `*` after the type:

````c
int *x;     /* points to an int */
char *s;    /* points to a char */
float **w;  /* points to a pointer that points to a float */
float ***a;  /* points to a pointer that points to a pointer that points to a  float */
````

A pointer to any value stored in memory can be taken by using the address-of operator `&`
Thus `&x`{.c} is the address of the value stored in `x`,
but `&3`{.c} is an error because 3 is a literal and does not have an address.
You also can't take the address of the result of an expression: `&(x + y)` or `&&x` are both errors as well.

You de-reference pointers with the same syntax used to create them: a `*` before the variable.

````c
int *x = &z;     /* x = pointer to z */
int x1 = *x;     /* x1 == z */
````

You can also de-reference pointers with subscript notation; `*x` and `x[0]` are entirely equivalent,
as are `*(x + n)` and `x[n]`.

There is syntactic ambiguity when combining `*` and `[1]`.
Is `*a[1]` the same as `*(a[1])` or `(*a)[1]`?
This is solved by operator precedence (`[]` before `*`),
but is not intuitive to most programmers
so you *should always* use parentheses in these cases.


All pointers are the same size (the size of an address in the underlying ISA) regardless of the size of what they are pointing to;
thus `sizeof(char *) == sizeof(long double *)`{.c}.
Two special int types are used to be "an integer the size of a pointer":
`size_t` is an `unsigned` integer of this size, and `ptrdiff_t` is a `signed` integer of this size.
With the compilers and ISAs we are using this semester `size_t` is the same as `unsigned long` and `ptrdiff_t` is the same as `long`.

When you add an integer to a pointer, the address stored in the pointer increases by a multiple of the `sizeof` the pointed-to type.

````c
int x = 10;
int *y = &x;                    // y points to x
int *z = y + 2;                 // z points 2 ints after x
long w = ((long)z) - ((long)y); // w is 8, not 2.
````



## Composite

There are two basic compound types in C: the `struct` and the array.

### Array

An array is zero or more values of the same type stored contiguously in memory.

````c
int array[1000];             /* an array of 1000 int values */
````

Except when used with `sizeof` and `&`, arrays act exactly like pointers to their first element;
notably, this means that `array[23]` does what you expect it to do: access the 24th element of the array.

The `sizeof` an array is the total bytes used by all elements of the array:


````c
unsigned x = sizeof(array);  /* 4000: sizeof(int) * 1000    */
````

The `&` an array is the `&` of its first element (i.e., `&array == &(array[0])`).


Parentheses are allowed when declaring types, although their meaning is counter-intuitive to many students:

````c
char *pc[10] x;     /* an array of 10 (char *)s */
char *(pc[10]) x;   /* an array of 10 (char *)s */
char (*pc)[10] x;   /* a pointer to an array of 10 (char)s */
````

The rule here is that we declare variables *exactly* as we would use them:
a point to an array would first be dereferenced (`(*pc)`) and then indexed (`(*pc)[i]`) to get a `char`
so we declare it as `char (*pc)[10]`.

Arrays literals use curly braces and commas.

````c
int x[10] = {1, 1, 2, 3, 5, 8, 13, 21, 34, 55};
````

Unless initialized with a literal like this, the contents of an array are *undefined* (i.e., may be any random values the compiler thinks is most efficient) when created.

Arrays cannot be resized after being created.

### Struct


A `struct` also stores values contiguously in memory,
but the values may be of different types and are accessed by name, not index.

````c
struct foo {
    long a;
    int b;
    short c;
    char d;
};           /* note the ; at the end; it is REQUIRED! */
````

The name of the resulting type includes the word `struct`

````
struct foo x;
unsigned long a = sizeof(struct foo);
x.b = 1234;
x.a = x.b - 5;
````

Compilers are free to lay out the data elements of a structure with padding between elements if they wish;
this is often done in practice to improve data alignment, so in the above example we expect `a` to have a value larger than the minimal 15 bytes needed to store those fields.

Structures are passed by value; that is, using them as arguments, return types, or with `=` means that all of their fields are copied.
This is inefficient for all by the smallest `structs`, so often pointers to structures are passed, not the structures themselves.

Because all pointers are the same size, you can have code use a pointer to a `struct`
without knowing what is inside the `struct`;
the only need to be known for the `.` operator to work.

````c
struct baz;                  /* just says "a struct of this name exists"   */
void swizzle(struct baz *);  /* just says "a function of this name exists" */

/* Swizzles an array of struct bazs                           *
 * This code does not need to understand what a struct baz is */
void swozzle(struct baz *, int n) {
    for(int i=0; i<n; i+=1) swizzle(baz + i);
}
````

Structure literals are written using curly braces and commas, optionally with `.fieldname =` prefixes

````c
struct a {
    int b;
    double c;
}

/* Both of the following initialize b to 0 and c to 1.0 */
struct a x = { 0, 1.0 };
struct a y = { .b = 0, .c = 1.0 };
````

Unless initialized with a literal like this, the values of fields of a struct are *undefined* (i.e., may be any random values the compiler thinks is most efficient) when created.


## Constant

If a type is preceded by `const`, the compiler is free to perform optimizations that assume that no code will ever change the values of this type after they are first initialized.

As a special syntax, a string literal like `"hello"`{.c} does two things:

1. It ensures there exists somewhere an array of characters `{'h', 'e', 'l', 'l', 'o', 0}`, typically in read-only memory.
2. It returns a `const char *` pointing to the `h`.

## typedef

You can give new names to any type by using the `typedef` statement:

````c
typedef int Integer;
Integer x = 23;

typedef double ** dpp;
double y0 = 12.34;
double *y1 = &y0;
dpp y = &y1;

struct foo { int x; double y; };
typedef struct foo foo;
foo z;
z.x = x;
z.y = **y;
````

`typedef` type names are aliases to the old names;
the compiler will treat both the original and new name as equivalent in all type checking.

Sometimes `typedef` is used with *anonymous* `struct`s:

````c
struct { int x; double y; } foo;
foo z;
````

## Union

A union is like a struct, except that all of the fields are stored in the same memory address.
In practice, this means only one of them has a meaningful value at a time.

````c
union odd {
    long long i;
    double d;
};

union odd x;
x.i = 0x1234;    /* x's memory now contains 34 12 00 00 00 00 00 00 */
double y = x.d;  /* y is now 2.30235e-320 (those same bytes) */

x.d = 0x1234;       /* x's memory now contains 00 00 00 00 00 34 b2 40 */
long long z = x.d;  /* z is now 0x40b2340000000000 (those same bytes) */
````

## You can do bad things

C does not try to prevent you from doing bad things.

````c
float x = 123.567f;   /* A floating-point number */
int y = *((int *)&x); /* An integer made from the same bytes as the floating-point number */

int z[4];             /* An array of 4 integers */
int w = z[254];       /* An integer made from the contents of memory 1000 bytes after the end of z */

const char *s = "hi"; /* compiler makes the string in memory the OS won't allow us to change */
char *t = (char *)s;  /* we get a pointer to that memory that C will allow us to change */
t[0] = 'H';           /* we try to change that memory (the OS will crash our program) */
````

C's general attitude is "every rule has an exception" and "the programmer knows best".
It might make you do some complicated casting to do things, but it won't stop you if you are determined.


# Control constructs

## Braces and scope

Any statement may be replaced with a sequence of statements inside braces.
Variables declared inside a set of braces vanish at the end of those braces.

````c
int x;
{
    int y;
    x = y;  /* OK, both x and y in scope */
}
y = x; /* ERROR: y is no longer in scope */
````

## Flow of control

### Nice and common ones

#### if

Any statement may be preceded by `if ( ... )`;
the statement will only be executed if the expression inside the parentheses yields a non-zero value.

Any statement following a statement preceded by `if ( ... )` may be preceded by `else`;
the statement will only be executed if the expression inside the `if`'s parentheses yields a zero value.

#### while

Any statement may be preceded by `while ( ... )`;
the statement will only be executed if the expression inside the parentheses yields a non-zero value,
and will continue to be executed until that condition stops being true.

#### for

The special construct `for (e1; e2; e3) s;`{.c}
is equivalent to the following:

````c
{
    e1
    while (e2) {
        s;
        e3;
    }
}
````

with a slight twist: if `s` contains a `continue`, it jumps to `e3` instead of to `while (e2)`.


If `e2` is omitted, it is assumed to be `1`, so `for(;;) s;` repeats `s` forever.

### Ugly and uncommon ones

#### do-while

The syntax `do s; while (e);`{.c} means the same as `s; while (e) s;`:
that is, it always does `s` once before first checking `e`.
In my experience, this is used for less than 1% of loops.

#### label and goto

Any line of code may be preceded by a label:
an identifier followed by a colon.

The `goto some_label;`{.c} statement unconditionally jumps to the code identified by that label.

In 1968 Edgar Dijkstra write an article "[Go To Statement Considered Harmful](Dijkstra68.pdf)".
Since then, the use of `goto` in code has dropped significantly; 
it's now usually a sign either of over-emphasis on optimization
or a shim to avoid having to redesign poorly-organized code.
However, there are a few situations where it can be handy, so it does sometimes show up in high-quality code.

#### switch

The `switch` statement in C may be implemented in several ways by the compiler,
but it is designed to be a good match for the "jump table" approach.

The syntax of the `switch` is as follows:

````c
switch(i) {
    case 0:
        statements;
        break;
    case 1:
        statements;
        break;
    case 3:
        statements;
        break;
    case 4:
        statements;
        break;
    default:
        statements;
}
````

Conceptually, this is

- a block of code
- with multiple labels
- where the labels are numbered, not named

and it operates like the (invalid) code

````c
c_code *targets[5] = { (case 0), (case 1), (default), (case 3), (case 4) };
if (0 <= i && i < 5) goto targets[i];
else goto default;
````

The `break` (as with a `break` in a loop) stops running the code block and goes to the first statement after it.

Many people think of a `switch` as being a nice way to write a long `if`/`else if` sequence,
and are then annoyed by its limitations and quirks:
it has to have an integer selector (as this is really an index),
and it "falls through" to the next case if there is no `break`.
Hence the following example, taken from [wikipedia](https://en.wikipedia.org/wiki/Switch_statement)

````c
switch (age) {
  case 1:  printf("You're one.");            break;
  case 2:  printf("You're two.");            break;
  case 3:  printf("You're three.");
  case 4:  printf("You're three or four.");  break;
  default: printf("You're not 1,2,3 or 4!");
}
````

Most compilers have several different implementations of `switch` they can pick between;
they might use a jump table, a sequence of `if`/`else if`s, a binary search, etc.

# Functions

