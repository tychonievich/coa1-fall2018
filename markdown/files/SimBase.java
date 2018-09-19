import java.util.Scanner;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;


public class SimBase {
    
    /** Returns the bits of number between idx1 and idx2 as an integer */
    public int get_bits(int number, int idx1, int idx2) {
        int low = idx1 < idx2 ? idx1 : idx2;
        int num = idx1 < idx2 ? idx2-idx1 : idx1-idx2;
        return (number >> low) & ((1<<num)-1);
    }
    /** Handles a single instruction, returning the new PC */
    public int execute(byte instruction, byte oldPC) {

        // to do: add instructions here

        return oldPC + 1;
    }

    byte[] M;
    byte[] R;
    byte pc;
    byte ir;
    
    public SimBase(Path filepath) throws java.io.IOException {
        M = new byte[256];
        R = new byte[4];
        Scanner s =  new Scanner(Files.newInputStream(filepath));
        int i = 0;
        while(s.hasNextByte()) {
            M[i] = (byte)s.nextShort(16); // cast because Java has signed bytes
            i += 1;
        }
    }
    public SimBase(String[] bytes) {
        M = new byte[256];
        R = new byte[4];
        for(int i=0; i<256 && i < bytes.length; i+=1) {
            System.out.println(java.util.Arrays.toString(bytes)+i);
            M[i] = (byte)Short.parseShort(bytes[i], 16); // cast because Java has signed bytes
        }
    }
    
    public static String toBin(int n, int width) {
        String ans = "";
        for(int i=0; i<width; i+=1) {
            ans += (char)('0' + (n&1));
            n >>= 1;
        }
        return ans;
    }
    /** Displays all processor state to command line */
    public void showState() {
        System.out.println("----------------------------------------");
        System.out.println("last instruction = "+toBin(ir, 8));
        for(int i=0; i<4; i+=1) {
            System.out.println("Register "+toBin(i, 2)+" = "+toBin(R[i], 8));
        }
        System.out.println("next PC = "+toBin(pc, 8));
        System.out.println("//////////////////////// Memory \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
        for(int i=0; i<256; i+=16) {
            System.out.printf("0x%02x-%02x: ", i, i+15);
            for(int j=0; j<16; j+=1) {
                System.out.printf("%02x ", M[i+j]);
            }
            System.out.println();
            boolean all0 = true;
            for(int j=i+16; j<M.length; j+=1) all0 &= (M[j] == 0); 
            if (all0) break;
        }
        System.out.println("----------------------------------------");
    }
    
    
    /** Implements one clock cycle */
    public void cycle() {
        ir = M[pc];
        pc = (byte)execute(ir, pc);
    }


    
    public static void main(String[] args) {
        if (args.length <= 0) {
            System.err.println("USAGE: java SimBase memory.txt\n    where memory.txt is a set of bytes in hex");
            System.err.println("USAGE: java SimBase byte [byte, byte, ...]\n    where the bytes are in hex and will be loaded into memory before running");
            System.exit(1);
        }
        SimBase simulator;
        try {
            Path p = Paths.get(args[0]).toRealPath();
            simulator = new SimBase(p);
        } catch (java.io.IOException ex) {
            simulator = new SimBase(args);
        }
        simulator.showState();
        Scanner keyboard = new Scanner(System.in);
        while(true) {
            System.out.print("Take how many steps (0 to exit, default 1)? ");
            String n = keyboard.nextLine();
            int num = 1;
            try {
                num = Integer.parseInt(n);
            } catch (NumberFormatException ex) {}
            if (num <= 0) break;
            for(int i=0; i<num; i+=1) {
                simulator.cycle();
                simulator.showState();
            }
        }
    }
}
