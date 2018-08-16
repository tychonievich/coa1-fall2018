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

### Two special option syntaxes

Most commands take a few basic arguments
and any number of a large set of option specifiers.

Option specifiers are generally provided in one of several ways:

short
:   Many options are a single character long, preceded by a hypen.
    For example, `ls` has an option `-a` that shows hidden files
    and `-l` that lists more details.
    Single-letter options can be combined into a single option,
    so you can use these by running any of the following:
    
    ````bash
    $ ls -a -l
    $ ls -l -a
    $ ls -al
    $ ls -la
    ````

long
:   If a single option is more than a single character, preceed it by two hypens.
    Long options cannot be combined like short options can.
    For example, `ls`'s `-a` option can also be written `--all`

    ````bash
    $ ls --all -l
    $ ls -l --all
    ````

short with argument
:   Some options expect a special value to be provided with them.
    For example, `ls` has an option `-w` that needs to be followed by an integer
    specifying how many characters wide the display wants to be.
    
    ````bash
    $ ls -w 40
    ````

long with argument
:   If a long option has an argument,
    it is indicated with a `=` and no spaces.
    For example `ls`'s `-w` option can also be written `--width`

    ````bash
    $ ls --width=40
    ````


### The most useful commands

-------     -------------------         ------------------------------------------------
Command     Example use                 Description
-------     -------------------         ------------------------------------------------
`cd`        `cd foo/baz`                **c**hange **d**irectory
        
`pwd`       `pwd`                       print the **c**urrent **w**orking **d**irectory
        
`ls`        `ls`                        **l**i**s**t directory contents
        
            `ls -l`                     `ls` with display in **l**ong form
        
`mkdir`     `mkdir foo`                 **m**a**k**e a new **dir**ectory

`cp`        `cp foo baz`                **c**o**p**y a file to a new name or directory
    
`mv`        `mv foo baz`                **m**o**v**e or rename a file or directory
    
`rm`        `rm foo`                    **r**e**m**o**v**e (i.e., delete) a file
                                        (warning: there is no trash bin to undelete from)

            `rm -r foo`                 `rm` **r**ecursively, deleting a directory and
                                        all of its contents. Dangerous! Can result in
                                        a lot of files vanishing forever if you type the
                                        wrong directory name.

`rmdir`     `rmdir foo`                 `rm` an empty **dir**ectory.
                                        Use `rm -r` if the directory is not empty.

`cat`       `cat foo`                   con**cat**enate files and print their contents
        
`less`      `less foo`                  show a scrolling view of a file's contents
                                        (type `q` to exit the view)
        
`man`       `man ls`                    show the **man**ual page for a command
        
`chmod`     `chmod a-r foo`             **ch**ange the file **mod**e bits (permissions)
        
`ssh`       `ssh mst3k@labsrv01`        **s**ecure **sh**ell (log into remote computer)

`scp`       `scp foo mst3k@labsrv01`    `cp` over `ssh` (copy files to/from remove computer)
-------     -------------------         ------------------------------------------------

## Redirection

Commands don't have to print to the screen or read input from the keyboard;
both of these can be redirected to files or other commands.

If a command ends with `> filename` it will print to a file with that name instead of to the screen.
**Warning**: this will replace any contents a file of that name used to have!

If a command ends with `>> filename` it will print to the end of a file with that name.

If a command ends with `< filename` it will read input from a file with that name instead of from the keyboard.

If two commands are separated by `|`, the first prints to the "keyboard" of the second.

Try these out: run each of the following lines one at a time and make sure you understand why it outputs what it does.

````bash
$ mkdir tmp
$ cd tmp
$ ls
$ pwd
$ echo This is going into a file > newfile.txt
$ ls
$ cat newfile.txt
$ echo another line >> newfile.txt
$ ls
$ cat newfile.txt
$ echo and another > newfile.txt
$ cat newfile.txt
$ cd ..
$ rm tmp
$ rmdir tmp
$ rm -r tmp
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
    
    `!ech`
    :   the most recent previous command beginning `ech`

    `!-`$n$, where $n$ is an integer
    :   the $n$th-previous command
    
    `!?ech`
    :   the most recent previous command that contains `ech` somewhere in it


## Directories

Directories are like named rooms with other rooms inside them.

### `cd` and `ls`

You can enter one of a directory's contained rooms with the `cd` command

````bash
$ cd baz     # enters the directory named "baz" inside the current directory
````

You can look around the room and see what's there with the `ls` command

````bash
$ ls         # lists all the things in the current directory
$ ls baz     # lists all the things in the "baz" directory
````

### Special names

There are four special directory names

`.`
:   the current directory; `cd .` does nothing

`..`
:   the containing directory; `cd ..` enters the directory that contains the current directory

`/`
:   the outermost directory that contains all others.
    `cd /` exits all directories and goes to the "root" directory.
    Does not work in thew middle of a directory path, only the beginning.

`~`
:   the current user's home directory.
    Does not work in thew middle of a directory path, only the beginning.


### Paths

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

### Permissions

Each directory has three permissions, called "read", "write", and "execute".

read
:   Turns on the lights, so you can see what's inside.
    Without read permission, `ls` won't work in the directory.

execute
:   Unlocks the doors, so you can move through it.
    Without execute permission, `cd` won't work into the directory
    and nothing will work with a path that includes the directory in the middle.

write
:   Lets you change what's in the directory.
    Without write permission, you can neither create nor remove
    files and directories inside a directory.

You can change permissions using the `chmod` command.
It has multiple ways to be used, but a few simple examples are

````bash
$ chmod a+r foo   # all users can read foo
$ chmod a-w foo   # no user can write foo
$ chmod u+w foo   # the owning user can write foo
````


## Files

Directories can contain other directories, and also can contain files.
Files, like directories, have names and permissions but cannot be entered with `cd`.
The permissions also have different meaning than with directories:

read
:   Lets you see the contents of the file.

execute
:   Lets you (try to) treat the file like a program.

write
:   Lets you change the contents of the file.



# Learn more with games

There are at least three games that teach more about the command line:

## Over The Wire Wargames

Visit <http://overthewire.org/wargames/> and read.
Many of the pages list web resources to help you learn more.

If you don't like reading (☹), try

````bash
$ ssh bandit0@bandit.labs.overthewire.org -p 2220
````

and consult <http://overthewire.org/wargames/bandit/bandit0.html> to get started.

## Terminus

Visit <http://web.mit.edu/mprat/Public/web/Terminus/Web/main.html>, read, and type.

## CLMystery

Type the following to get started

````bash
$ git clone https://github.com/veltman/clmystery.git
$ cd clmystery
$ cat instructions
````
