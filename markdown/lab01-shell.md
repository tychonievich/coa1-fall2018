---
title: Shell Lab
...

The purpose of this lab is to get you familiar with the most important aspects of the command line environment,
sometimes called the shell, sh, bash, or the terminal.

# Pre-note

It is our plan to have most labs use NoMachine/NX to have you interact with a Linux environment from your personal computer. However, the systems staff is a bit behind schedule in creating all NX accounts. It is possible this lab will not use NX, even though it will prepare you to do so in the future.

We have not used this particular lab before. Thus, we might have targeted the length incorrectly. Follow the TAs' suggestions on pacing, if to skip bits, etc.

# Install NX Client

1. Visit <https://www.nomachine.com/download>

2. Download and run the installer for your operating system

3. Run the resulting exectuable (which may be called "No Machine", "NX", or "nxplayer" depending on platform)

4. You may see a "welcome" screen; if so click past it

    ![The welcome screen](files/nomachine-1.png)

5. There are several variants of the next screen, but all of them have a "New" button; click this

    ![One example of the connection choice view](files/nomachine-2.png)

6. There are five steps to setting up a new connection
    
    a. Protocol: leave as default "NX"
        
        ![Protocol selection screen](files/nomachine-3.png)
    
    b. Host: use `nxfront.cs.virginia.edu`, with default port (4000) and UDP communication
    
        ![Host selection screen](files/nomachine-4.png)
    
    c. Authentication: use "password"
    
        ![Authentication selection screen](files/nomachine-5.png)
    
    d. Proxy: do not use a proxy
    
        ![Proxy selection screen](files/nomachine-6.png)
    
    e. Save as: name your connection; you'll want to re-use this instead of selecting "New" in the future

7. Connect to your newly-created session

8. If asked, Accept host authenticity. If you care to check, it's

    Host
    :   `nx.cs.virginia.edu`
    
    IP Address
    :   There are several (`nxfront` re-routes you to the least-used back-end computer), all beginning `128.143.67`
    
    Certificate fingerprint
    :   SHA 256 `2D b9 74 B2 5C 7A 92 6F DD FD 98 2E 0D 35 A1 E5 99 8A A8 5B 81 A7 41 16 8F 46 0F 03 9E 3F 7F B1`.
    
        Note: this might change as certificates are updated; I'd not suggest checking it unless you are particularly paranoid.

9. Log in with your computing ID and the password you were emailed by the CS systems administrator (*not* your netbadge password; this one is separate and should have been emailed to you on Friday)

10. It will probably require you to change your password. Do so. And remember your new one.

12. Create a new virtual desktop (unless you already have one created from earlier)
    
    ![Virtual desktop](files/nomachine-7.png)

13. Unless you know you want something else, pick the "fit to window" and the "menu panel covering all screens" options

    ![Fit to window (small icon at bottom)](files/nomachine-8.png)

    ![All screens](files/nomachine-9.png)

    ![Fit to window, second selection (small icon at bottom)](files/nomachine-10.png)

14. You are now in a Linux (CentOS) remote desktop!
    For this lab, open a terminal:

    ![Where to find "Terminal" application](files/nomachine-11.png)

    There are other applications available, such as the Firefox web browser;
    if you want to use command line tools beyond what this class will require
    you might also be interested in the department [modules documentation](//www.cs.virginia.edu/wiki/doku.php?id=linux_environment_modules).


# Learn to...

Our goal in this lab is for you to understand how to navigate on the command line. In particular, you should be able to

1. Understand the syntax of commands, including arguments and options
2. Look up what a command does using `man`{.sh}, `--help`, and `-h`
3. Repeat previous commands without re-typing them
4. Know (without needing to look them up each time) the commands needed to
    - see where you are
    - mode to a new directory
    - create a new directory
    - see the contents of a file
    - change permissions of a file or directory
    - remove files and directories
    - access other servers

## Step 1: play Terminux

Visit <http://web.mit.edu/mprat/Public/web/Terminus/Web/main.html>, a somewhat cheesy introduction to the basics of the command line. Explore it until you 

- feel comfortable with the use of `ls`, `pwd`, `cd` (including `cd ..`), and `less`
- have learned about `mv` and `man`

There is a lot more you can do (creating a magic locker, explore a hidden tunnel, learn about `grep` and `rm`, etc.) but those are the most important basics.
If `NX` is not working, keep exploring for the full lab time; you'll learn a lot and hopefully also have fun along the way.
Otherwise, continue with Step 2.

## Step 2: learn terminology

The most common "command line environment" in Linux is called `bash`, a variant of the more primitive `sh`ell. Terminus was somewhat like bash; following is a comparison

--------------------------------------------------------------------------------
Terminux                    Bash
--------------------------- ----------------------------------------------------
Location                    Directory

Item                        File

`pwd` shows one location    `pwd` shows a full "path": each step needed to get 
                            here, separated by `/`

`ls` shows locations and    `ls` shows all directories and files in one list
items separately

`mv` only moves items into  `mv` can also move directories into one another
locations                   and rename files (as e.g. `mv oldname newname`)

`less` and `man` show text  `less` and `man` temporarily take over the screen,
below current text          letting you scroll around with arrow keys until you
                            exit the view with the `q` key
--------------------------------------------------------------------------------

Try these out in your NX terminal.

The first word you type is called a "command"; after that come a series of "arguments" or "command-line arguments". Together, the command and its arguments make up a "command" or "command line".

Many commands accept special arguments beginning with a hyphen called "options".
For example, most include an option named either `-h` or `--help` that gives a shorter summary of usage than does `man`.

## Step 3: DRY (**D**on't **R**epeat **Y**ourself)

Most (though not all) command lines will provide various forms of autocompletion to help streamline interaction.
The two most useful are

Up and Down
:   The up and down arrow keys navigate through a history of previously-typed commands.
    On some systems, page-up and page-down also navigate in large chunks.

Tab
:   Pressing the tab key when the cursor is preceded by an incomplete word that can only be completed in one way
    will fill in the rest of the word.
    
    Pressing tab twice when the cursor is preceded by an incomplete word that can be completed in several ways lists all of the completions the command line knows about.

These even work in Terminux.


## Step 4: try `ssh`

There is a very useful command `ssh` that allows you to log into a different computer's command line remotely.
To learn this, and a few other commands, we have another game:

Visit <http://overthewire.org/wargames/> and read.
Many of the pages list web resources to help you learn more.

If you don't like reading (☹), try

````bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
````

We suggest getting to level 4 of Bandit, though you might find other levels and games interesting.

## Step 5: Understand `chmod` and set up your directory safely

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
chmod a+r foo   # all users can read foo
chmod a-w foo   # no user can write foo
chmod u+w foo   # the owning user can write foo
````

Directories can contain other directories, and also can contain files.
Files, like directories, have names and permissions but cannot be entered with `cd`.
The permissions also have different meaning than with directories:

read
:   Lets you see the contents of the file.

execute
:   Lets you (try to) treat the file like a program.

write
:   Lets you change the contents of the file.

Every user belongs to one ore more groups, and every file or directory has an owning user and an owning group.
Permissions are specified as read/write/execute for the user, group, and others.

You can find out your user name with `whoami` and your group memberships with `groups`.

You should set up your home directory so only you can access it, not other people in your group nor strangers not in your group:


````bash
cd              # go home
chmod g-rwx .   # remove group-access to read, write, and execute this directory
chmod o-rwx .   # remove other-access to read, write, and execute this directory
````

----


# More on commands (reference for the curious)

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
by using a backslash `\` or enclosing the command in *single* quotes.^[Double quotes sometimes work too, but don't escape `$`, `\``, `!`, or `\\`. They also have some nuanced special meanings we won't encounter in this course.]

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
/home/mst3k/tmp
$ echo This is going into a file > newfile.txt
$ ls
newfile.txt
$ cat newfile.txt
This is going into a file
$ echo another line >> newfile.txt
$ ls
newfile.txt
$ cat newfile.txt
This is going into a file
another line
$ echo and another > newfile.txt
$ cat newfile.txt
and another
$ cd ..
$ rm tmp
rm: cannot remove ‘tmp’: Is a directory
$ rmdir tmp
rmdir: failed to remove ‘tmp’: Directory not empty
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
    Does not work in the middle of a directory path, only the beginning.


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

or `cd foo/xyxxy`; the `..` undoes the preceding `baz`.

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
$ git clone https://github.com/ryansobol/clmystery.git
$ cd clmystery
$ cat instructions
````
