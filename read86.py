import re

jumpers = re.compile(r'#[^\n]*|\s([.a-zA-Z0-9_]+)\s*:|\b(j..?)\s+(\S+)[^\n]*|\b(ret.?)\b[^\n]*')

def funcs(asm):
    """Given raw assembly, returns a dict of suspected functions
    A function runs from a no-target label through to a ret,
    including any jumped-to labels functions"""
    labels = {}
    inside = set()
    for f in jumpers.finditer(asm):
        if f.group(1) is not None:
            labels[f.group(1)] = [f.start(), f.end(), set()]
            inside.add(f.group(1))
        if f.group(2) is not None:
            for l in inside:
                labels[l][2].add(f.group(3))
        if f.group(2) == 'jmp' or f.group(4) is not None:
            for l in inside:
                labels[l][1] = f.end()
            inside.clear()
    funcs = {k:[v[:2]] for k,v in labels.items()}
    for k,v in labels.items():
        for has in v[2]:
            if k not in funcs: continue
            if has in funcs: 
                funcs[k].extend(funcs[has][:2])
    # print(labels)
    # print(funcs)
    for k,v in list(funcs.items()):
        if k[0] == '.':
            del funcs[k]
        else:
            v.sort()
            funcs[k] = [min(_[0] for _ in v), max(_[1] for _ in v)]
    # print(funcs)
    return {name:asm[_[0]:_[1]] for name,_ in funcs.items()}

def recursive(fname, asm):
    return re.search(r'call.?\s*'+fname, asm) is not None

def calls(asm):
    return list(sorted(set(re.findall(r'call.?\s*(\S+)', asm))))

def loop(asm):
    seen = set()
    for f in jumpers.finditer(asm):
        if f.group(1) is not None:
            seen.add(f.group(1))
        elif f.group(2) is not None:
            if f.group(3) in seen: return True
    return False


if __name__ == "__main__":
    import sys, os.path, json
    if len(sys.argv) != 3:
        print('USAGE:', sys.argv[0], '[assembly.s] [function_name]')
    elif not os.path.exists(sys.argv[1]):
        print(json.dumps({'error':'file '+sys.argv[1]+' not found'}, separators=(',',':')))
    else:
        filename, funcname = sys.argv[1:]
        with open(filename) as fp: asm = fp.read()
        fset = funcs(asm)
        if funcname not in fset:
            print(json.dumps({'error':'file '+filename+' does not contain function '+funcname}, separators=(',',':')))
        else:
            print(json.dumps({
                'recursive':recursive(funcname, fset[funcname]), 
                'looping':loop(fset[funcname]),
                'calls':calls(fset[funcname]),
            }, separators=(',',':')))
        
    # import glob
    # for s in glob.glob('*.s'):
        # with open(s) as fp: asm = fp.read()
        # print('-'*60)
        # # print(asm)
        # ans = funcs(asm)
        # for k,v in ans.items():
            # print('====',k,'====')
            # print(v)
            # print('---- recursive?', recursive(k, v))
            # print('---- loop?', loop(v))
        

