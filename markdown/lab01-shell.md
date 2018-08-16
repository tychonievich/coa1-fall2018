---
title: Shell Lab
...

The purpose of this lab is to get you familiar with the most important aspects of the command line environment,
sometimes called the shell, sh, bash, or the terminal.

# Install NX Client

(awaiting instructions from systems staff)

# Open a terminal

(add instructions that work)

# Basic commands

The main interactions you have in a terminal consist of directories, files, and commands.

## Commands

You type commands.
First comes the name of the command, and then optionally an number of arguments to it.
Commands are kind of like functions, but the syntax is different: spaces are used instead of parentheses and commas.

One of the commands is called `echo`.
It is sort of like a `print` in Python or a `println` in Java.
For example, if you type

````bash
echo This is my first command
````

you should see a line displayed,

````
This is my first command
````

It is traditional to display example commands to run with a `$` before them, like

````bash
$ echo this is more traditional
````

You don't type the `$` when you see this.

Some characters have special meaning, and need to be escaped if you want to use them
by using a backslash `\` or enclosing the command in single quotes.
Note: double quotes sometimes work too, but don't escape everything...

````bash
$ echo \$100 '$100' '$'100
````

## Autocomplete

Most (though not all) command lines will provide various forms of autocompletion to help streamline interaction.
Common components include

Up and Down
:   The up and down arrow keys navigate through a history of previously-typed commands.
    On some systems, page-up and page-down also navigate in large chunks.

Tab
:   Pressing the tab key when the cursor is preceded by an incomplete word that can only be completed in one way
    will fill in the rest of the word.
    
    Pressing tab twice when the cursor is preceded by an incomplete word that can be completed in several ways lists all of the completions the command line knows about.

Bang commands
:   If a command begins with a `!` (pronounced "bang"),
    what follows helps specify a previously-typed command.
    
    `!!`
    :   the previous command, like up-arrow enter
    
    `!-`$n$
    :   the $n$th-previous command
    
    `!ech`
    :   the most recent previous command beginning `ech`
    
    `!?ech`
    :   the most recent previous command that contains `ech` somewhere in it


## Directories

Directories are like named rooms with other rooms inside them.

You can enter one of a directory's contained rooms with the `cd` command

````bash
$ cd baz     # enters the directory named "baz" inside the current directory
````

There are three special directory names

`.`
:   the current directory; `cd .` does nothing

`..`
:   the containing directory; `cd ..` enters the directory that contains the current directory

`/`
:   the outermost directory that contains all others (but not in the middle of paths; see below).
    `cd /` exists all directories and goes to the "root" directory.

You can combine directory moves by connecting names with `/`;
thus `cd foo/baz/../xyxxy` does the same thing as

````bash
$ cd foo
$ cd baz
$ cd ..
$ cd xyxxy
````

which also does the same thing as

````bash
$ cd foo
$ cd xyxxy
````

or `cd foo/xyxxy` since the `..` undoes the preceding `baz`.
