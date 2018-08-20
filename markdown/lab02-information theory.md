---
title: Information Theory Lab
...

# Introduction

Claude Shannon founded the field of information theory.
A core fact in information theory is that there is a basic unit of information,
called a "bit^[a portmanteau of "binary digit"]" or a "bit of entropy."
Roughly speaking, a "bit" is an amount of information that is about as surprising as the result of a single coin flip.
In the sentence "please pass the salt" the word "salt" has very low entropy; most of the time someone says "please pass the" the next word they say is "salt," so adding that word provides very little more information.
On the other hand, the word that comes after "is" in "Hello, my name is" has many bits of entropy; no matter what the word is, it was quite surprising.

In computers, we rarely encode things anywhere near as efficiently as its bits of entropy suggest.
For example, most common encodings of strings use 8 bits per character.
In this lab, you'll replicate an experiment Claude Shannon published in 1950^[Shannon, Cluade E. (1950), "Prediction and Entropy of Printed English", *Bell Systems Technical Journal* (3) pp. 50--64.] to see just how inefficient that encoding is.


# Preparation

In the first half of this lab you will write a program in either Python or Java.
In the second half you'll use that program to perform an experiment and reflect on the results.

You may either work alone or with a buddy in this lab.
Buddy programming is where two people work side-by-side,
each creating similar programs while talking together to help one another out.
In well-running buddy programming each buddy is speaking about equally,
describing what they are writing next or how they are testing what they have written.
Buddy programming usually results in similarly-designed but non-identical programs.

If you use a buddy, you should sit next to them and use the same language they use.

# Create the program

Your program should do the following:

1. Read a text file into a string in memory.
    You should be able to specify different file names each time you run the program.

2. Repeatedly

    a. Pick a random index in the middle of the string
    b. Display to the user the 50 characters preceding that index (in such a way that they can tell if what you displayed ended in a space character or not)
    c. Have the user type a single character
    d. Record if that typing was correct

3. After some fixed number of iterations (20 might make sense), display
    
    - The ratio of correct guesses (e.g., "`You got 14 out of 20 guesses correct!`")
    - The estimated bits of entropy per letter of the text, which is
        log~2~(*g* ÷ *r*) where *g* is the total number of guesses made
        and *r* is the number that were correct
        (e.g., 0.5145731728297582 for 14 of 20 correct).

# What is the entropy of...

Once your program seems to be working, try it on a few different texts.
For example, you might try

- [tarzan.txt](files/tarzan.txt) -- the original Tarzan book by Edgar Rice Burroughs.
- [pi.txt](files/pi.txt) -- the first million digits of pi.
- [_pydecimal.py](files/_pydecimal.py) -- a large file from the Python standard library.
- [diff_match_match.java](files/diff_patch_match.java) -- a large file from the open source Java project [diff-match-match](https://github.com/google/diff-match-patch).

Add a comment to the top of your code that includes at least the following:

- Who your buddy was, if any
- What files you tested (if other than the above, with their full URL or a description of what they contained) and what the results were for each
- An additional experiment you did and how it came out. For example, you might try to answer
    - is language X more or less entropic than language Y?
    - does it matter how many characters you display as context for their guess?
    - is the answer different if you display the characters after, not before, the one they guess?
    - if you re-run the test on the same file repeatedly, how consistent are the answers?
    - if you compress the file (e.g., into a .zip file or the like), how much smaller does it get? How (and why) is this related to its bits of entropy?

# Submit

Submit your file at the end of lab on [the course submission site](https://archimedes.cs.virginia.edu/coa1-f2018/).

One of our goals is to determine how long this lab actually takes.
Please work for the entire lab time and then submit when the time ends,
whether that is a half-finished program or a program with the outcome of dozens of experiments at the top.
If you submit early or late, please clearly indicate how long you actually spent in a comment.

