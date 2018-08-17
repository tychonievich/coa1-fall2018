---
title: Components of digital computers
author: Luther Tychonievich
license: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)</a>
...

Processor hardware is built out of three main conceptual pieces:
wires, gates, and registers.
These behave in some ways much like variables, operators, and data structures
but in other ways they are distinct.
Understanding their semantics is key to understanding hardware design.

# Current, Voltage, Power, and Heat

Ignoring many of the nuances of electricity and speaking only in broad generalities,

Current
:   is the rate at which electrons flow.
    In practice it is not always electrons that are the conceptual charge carriers
    and amperage does not map directly to electrons/second, but that is the general idea.

    If electrical state changes, current is involved.

Voltage
:   is the desire electrons have to flow; the electrical pressure, if you will.
    Voltage does not always cause current because it contends against resistance: not all substances conduct electricity very easily.

    Most elements of computer hardware are sensitive to voltage.
    The "1"s are "high voltage" and "0"s are "low voltage".
    How high depends on the underlying design of the components,
    but chips with highs of around 1 volt are common today (2018).
    Low voltage is generally close to 0 volts.

Power
:   is current × voltage.
    It does not require power to maintain voltage without current, nor to maintain current without voltage.

    Since chip *state* is voltage and *change* in state requires current,
    every time that a processor changes state it uses power.
    In practice some power is used even between state changes too,
    since it is hard to maintain voltage in a changeable system without some current "leakage".

Heat
:   is (by the law of entropy^[Newton's entropy, not Shannon's entropy.]) an inevitable byproduct of power.
    It is also a major concern for chip manufacturers.
    Chips are so small and the power they use so concentrated
    that even a small amount of heat can result in a large temperature change^[Recall that heat is energy that changes temperature; temperature is the average speed of molecules within matter.].
    Electrical properties tend to change with temperature,
    and notably we have trouble making microscopic components that function like logical gates at higher temperatures.

    It is thus vital that chip temperature be kept low enough
    that the chip continues to function.
    Heat sinks, fans, and other cooling systems can help, but their impact is limited.
    To reduce heat we must reduce power;
    and to reduce power we either need to reduce voltage (meaning more sensitive and harder-to-engineer components)
    or reduce current (meaning less state change and thus a reduction in chip speed).

In this course we will not explore designing for limited power usage,
but the outline given above is useful to be conversant in hardware design issues.
It also explains why tablets tend to be slower than servers:
they have less power to draw from (a battery instead of a connection to the power plant)
and less space to devote to heat dissipation (heat sinks, fans, and so on)
so they cannot change as much voltage as quickly as the servers can.


# Multi-bit "wire"s and "gate"s

We discussed gates in [Boolean Algebra and Gates](bool.html);
these are connected by wires to make logic chips.
Note that each wire needs to have one source (either an input signal or the exit point of a logic gate)
and may have any number of sinks (output signals and the entry points of gates).
There are many other nuances to consider if you are designing an actual physical chip, but they will not be necessary for this course.

Usually, we don't want to work on single bits at a time but rather on multi-bit signals.

A multi-bit extension of a wire is just a cluster or wires run next to each other.
Eight wires running together can transmit eight bits of information in their voltages.
Such a group of wires is sometimes called just a "wire" or sometimes "an 8-bit-wide wire," "a wire carrying an 8-bit value," or "an 8-bit wire."

A multi-bit mux has multi-bit inputs and output, all the bits of which share a single selector.  They can be implemented as a separate 1-bit mux for each bit of output:

````c    
out_0 = selector ? in1_0 : in0_0;
out_1 = selector ? in1_1 : in0_1;
out_2 = selector ? in1_2 : in0_2;
...
````

In most programming languages, the `?:` operator acts like a multi-bit mux.
Similarly, the operators `~`, `&`, `|`, and `^` act like multi-bit logic gates (so `0b0011 ^ 0b0110 == 0b0101`),
`+` like a multi-bit adder, and so on.


## Transitioning multi-bit values

It is almost never the case that all of the gates on all of the individual wires of a multi-bit component produce output at exactly the same speed.  This means that during the transition time, the outputs of logical components cannot be trusted to be any valid value.

Suppose I have an adder with inputs `0b0001` and `0b0110`;
the adder is currently producing output `0b0111`.
Now I change the second input to `0b0111`.
Eventually the output will change to `0b1000`, meaning all four bits change.
However, I cannot in general predict the order in which the bits will change;
if (for example) the two low order bits change first (expected for the kind of adder presented earlier in this text)
then there will be a moment in time when the adder is outputting `0b0100`.
But `0b0100` is not the correct output for either the old or the new inputs.

Not all orders of changes are possible,
but it is usually the case that the outputs of a logical component
goes through a period of incorrect values during each transition.
It is thus important to design circuits such that these transitional outputs
are ignored and not committed to the programmer-visible state of the processor.

# Registers

Consider the following circuit:

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 33" style="max-width:10.4em">
<defs>
<marker id="TriangleOutM" refY="1.5" refX="0" orient="auto">
<path d="m 2,1.5, -2,1.5, 0,-3 z"/>
</marker>
</defs>
<g transform="translate(0,0)">
<text style="text-anchor:middle;text-align:center;" font-size="8px" y="25" x="50"><tspan x="50" y="25">+</tspan></text>
<circle r="7.5" cx="50" cy="22.5" stroke="#000" fill="none"/>
<text style="text-anchor:middle;text-align:center;" font-size="8px" y="25" x="15"><tspan x="15" y="25">0001</tspan></text>
<path style="marker-end:url(#TriangleOutM);" d="M57.5,22.5,70,22.5,70,5,50,5,50,12.5" stroke="#000" fill="none"/>
<path style="marker-end:url(#TriangleOutM);" d="m25,22.5,15,0" stroke="#000" fill="none"/>
<text style="text-anchor:middle;text-align:center;font-style:italic;" font-size="8px" y="30" x="60"><tspan x="75" y="17.5">x</tspan></text>
</g>
</svg>

As we stated [in the previous section](#transitioning-multi-bit-values),
the different bits of the output of the adder appear at different times.
This means that if we start with $x = 0$ we might see a sequence of x values like 0, 1, 0, 2, 1, ...: in other words, not the sequence we want to see.
To fix this we add a register to the circuit:

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 48" style="max-width:10.4em">
<defs>
<marker id="TriangleOutM" refY="1.5" refX="0" orient="auto">
<path d="m 2,1.5, -2,1.5, 0,-3 z"/>
</marker>
</defs>
<g transform="translate(0,15)">
<text style="text-anchor:middle;text-align:center;" font-size="8px" y="25" x="50"><tspan x="50" y="25">+</tspan></text>
<circle r="7.5" cx="50" cy="22.5" stroke="#000" fill="none"/>
<text style="text-anchor:middle;text-align:center;" font-size="8px" y="25" x="15"><tspan x="15" y="25">0001</tspan></text>
<path style="marker-end:url(#TriangleOutM);" d="M57.5,22.5,70,22.5,70,5,50,5,50,12.5" stroke="#000" fill="none"/>
<path style="marker-end:url(#TriangleOutM);" d="m25,22.5,15,0" stroke="#000" fill="none"/>
<text style="text-anchor:middle;text-align:center;font-style:italic;" font-size="8px" y="30" x="60"><tspan x="75" y="17.5">x</tspan></text>
</g>
<rect x="55" y="5" width="10" height="20" fill="#fff" stroke="#000"/>
<path d="m57,5 3,5 3,-5" fill="none" stroke="#000"/>
<path d="m60,0 0,5" fill="none" stroke="#000"/>
<text style="text-anchor:middle;text-align:center;font-style:italic;" font-size="8px" y="20" x="60"><tspan x="60" y="20">R</tspan></text>
</svg>

Registers have one input and one output, as well as a second single-bit input called the "clock" (drawn at the top of $R$ in the image above; the triangle is a traditional marker for a clock input).
They store a value inside them, and most of the time they completely ignore their input and output that internal value.
However, at the moment when the clock input transitions from low- to high-voltage (and only at that moment) they read their input into their internal stored value.

The clock inputs of all registers across the entire chip are (conceptually)
attached to the same "clock", a oscillator that outputs low-voltage, then high-voltage, then low-voltage, then high-voltage, ..., at predictable intervals.

Adding the register solves the unpredictable output problem.
The current value of $R$ and 1 are sent into the adder;
its output jumps about a bit but stabilizes at the value $R+1$;
then the clock changes from 0 to 1 (called the "rising clock edge")
and the new value is put into $R$.
Once the new value is in it is output and the adder output starts jumping around again,
but that is fine because the register will ignore it until the next rising clock edge.

## Clock Speed

The clock is important enough to have become one of the most noted stats about chips:
a 2GHz clock speed means the clock oscillator completes 2 billion ($2×10^9$ not $2×2^30$) low-high cycles per second.
Because virtually every part of a chip contains registers,
and because all registers are attached to the clock,
clock speed is a direct indicator of overall processor speed.

So, why not just add a faster oscillator to make the chip faster?
There are two main reasons:

-   Faster clock → more changes per second → more current → more power → more heat.
    Some chips are designed to reduce their own clock speed
    either to conserve battery life or to manage their temperature.

    Access to plenty of power and a more efficient cooling system can reduce this constraint.

-   It takes time for electrons to move across wires and through transistors.
    If the clock runs too fast it might grab a pre-stabilized value and cause computations to be incorrect.
    A faster computer that sometimes decides that 2 + 3 = 1 is not as useful as a slower one that always knows it is 5.

    There are two main ways to overcome this limit on effective clock speed:

    -   Make the chip smaller.
        Smaller transistors and shorter wires → less distance for charge carriers to travel → faster operation.
        For many years this tactic yielded impressive gains every year,
        but components less than 50 atoms across^[
          Chip component sizes are measured in nanometers, not atoms,
          but most of us have no concept of how small a nanometer is.
          The atomic radius of silicon (the principle element in most chips today) is about .11 nm;
          silicon bonds with itself at about 4.3 atoms per nm.
          Samsung began shipping 10nm-scale chips in 2017.
        ] entered mass production in 2017;
        it is not clear how long this trend can continue.

    -   Reduce the work done between each clock cycle.
        Less work → less logic to wait for → faster clock; we'll learn more about this as we discuss [pipelining](isa.html#pipelining-and-beyond).
        Once chip shrinkage stopped yielding big speedups, pipelining was seen as the next thing to increase;
        but it also has limitations and more-or-less optimal-depth pipelines have been determined.

Some people chose to overclock their chips.
Roughly, they take a chip that was designed to run at one speed
and they attach a faster clock to it.
Since the shipped clock speed is generally a conservative estimate,
sometimes this just works and the processor becomes faster at no extra cost.
But sometimes the new clock speed is too fast and the computer overheats and/or fails to compute correctly.
Worse yet, often the problem is not immediately manifest,
perhaps only overheating after months of use
or only making an error in computation on one out of every billion computations.

# Memory

Conceptually, memory acts like a huge array or list of bytes,
or like a giant mux in front of a huge bank of registers.
It is implemented much more cheaply than registers are,
though also in a way that runs more slowly.

In general, processors interact with memory via **loads** and **stores**.
In a *load*, the processor sends it an address and a number of bytes
and it sends back that many bytes from that address and the next few.
In a *store*, the processor sends it an address and one or more bytes
and it changes the contents of the memory at those addresses.
There is not particular magic, from the processor's perspective, to this:
the address and values are all just a bunch of wires running between gates within the processor on one end
and the similar gates within the memory chip on the other.

Modern computers add significant complexity to this basic design,
with address translation to achieve virtual memory
and a hierarchy of different caches to make memory seem faster,
but the core interface from the heart of the processor's point of view is just some address and value wires.
We'll discuss more about these topics in COA 2.
