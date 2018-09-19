def get_bits(number, idx1, idx2):
    """Returns the bits of number between idx1 and idx2 as an integer"""
    if idx1 > idx2:
        low, num = idx2, idx1-idx2
    else:
        low, num = idx1, idx2-idx1
    return (number >> low) & ((1 << num)-1)


def execute(instruction, oldPC):
    """Handles a single instruction, returning the new PC"""
    global M, R
    
    # to do: add instructions here
    
    return oldPC + 1



# initialize memory and registers
R = [0 for i in range(4)]
M = [0 for i in range(256)]

# initialize control registers
ir = 0
pc = 0


def cycle():
    """Implement one clock cycle"""
    global M, R, pc, ir
    
    # execute
    ir = M[pc]
    pc = execute(ir, pc)
    
    # enforce the fixed-length nature of values
    for i in range(len(R)): R[i] &= 0b11111111
    for i in range(len(M)): M[i] &= 0b11111111
    pc &= 0b11111111
    

def showState():
    """Displays all processor state to command line"""
    print('-'*40)
    print('last instruction = {:08b}'.format(ir))
    for i in range(4):
        print('Register {:02b} = {:08b}'.format(i, R[i]))
    print('next PC = {:08b}'.format(pc))
    print('//////////////////////// Memory \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
    for i in range(0, 256, 16):
        print('0x{:02x}-{:02x}'.format(i, i+15), end=': ')
        for j in range(16):
            print('{:02x}'.format(M[i+j]), end=' ')
        print()
        if not any(M[i+j:]):
            break
    print('-'*40)


if __name__ == '__main__':
    import sys, os.path
    
    if len(sys.argv) <= 1:
        print('USAGE: python', sys.argv[0], 'memory.txt\n    where memory.txt is a set of bytes in hex')
        print('USAGE: python', sys.argv[0], 'byte [byte, byte, ...]\n    where the bytes are in hex and will be loaded into memory before running')
        quit()
    
    if os.path.exists(sys.argv[1]):
        with open(sys.argv[1]) as f:
            i = 0
            for b in f.read().split():
                M[i] = int(b, 16)
                i += 1
    else:
        i = 0
        for b in sys.argv[1:]:
            M[i] = int(b, 16)
            i += 1
    
    showState()
    while True:
        n = input('Take how many steps (0 to exit, default 1)? ')
        try:
            n = int(n)
        except:
            n = 1
        if n <= 0: break
        for i in range(n):
            cycle()
            showState()
