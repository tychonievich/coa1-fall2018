function toHex(num, digs) {
    if (digs < 16 && digs > 0) num &= (1<<(digs*4))-1;
    return Number(num).toString(16).toUpperCase().padStart(digs, '0');
}

function HexBank(addressBits) {
    if (addressBits > 16) throw new Exception("Too many address bits (max 16)");
    let addressNybbles = Math.ceil(addressBits / 4);
    
    this.bytes = new Uint8Array(1<<addressBits);
    this.style = document.createElement('style');
    this.style.appendChild(document.createTextNode(`
        .hexbank { border-collapse:collapse; border: thin solid white; }
        .hexbank:focus { border: thin solid blue; }
        .hexbank th { font-family: monospace; color:rgba(0,0,0,0.25); font-weight: normal; white-space:pre; }
        .hexbank th, .hexbank td { padding:0.25ex; vertical-align:bottom; }
        .hexbank td:nth-child(16n-11), .hexbank td:nth-child(16n-3) { border-right: 0.25ex solid rgba(0,0,0,0.25); }
        .hexbank td:nth-child(9) { border-right: 0.5ex solid rgba(0,0,0,0.25); }
        .hexbank td:nth-child(2n+1) { background-color: rgba(0,0,0,0.0625); }
        span.nybble { font-family: monospace; }
        span.nybble.cursor { background-color: rgba(0,127,255,1); color: white; }
    
        .empty { display: none; }
        .empty.active, .empty:first-child { display: table-row; }

        .empty:not(.active):not(:first-child) + .full th, .empty:not(.active):not(:first-child) + .empty.active th { padding-top: 1em; }
    `)); // work around webkit bug; insertRule more efficient, but webkit won't let it work with an empty body
    
    function sel() {
        document.querySelectorAll('.cursor').forEach(function(x){
            x.classList.remove('cursor');
            x.parentElement.parentElement.classList.remove('active');
        });
        this.classList.add('cursor');
        this.parentElement.parentElement.classList.add('active');
    }
    
    this.body = document.createElement('table');
    this.body.className = 'hexbank';
    this.body.appendChild(document.createElement('thead')).appendChild(document.createElement('tr'));
    for(let i=-1; i<0x10; i+=1) 
        this.body.lastElementChild.lastElementChild
            .appendChild(document.createElement('th'))
            .appendChild(document.createTextNode(i<0 ? ' ' : '…'+toHex(i,1)));
    
    let nyb = 0;
    let tbody = this.body.appendChild(document.createElement('tbody'));
    tbody.id = 'hexBank';
    for(let b=0; b<this.bytes.length; b+=0x10) {
        let row = tbody.insertRow();
        row
            .appendChild(document.createElement('th'))
            .appendChild(document.createTextNode(toHex(b/0x10, addressNybbles-1)+'…'));
        row.className = 'empty';
        for(let i=0; i<0x10; i+=1) {
            let cell = row.insertCell();
            for(let n=0; n<2; n+=1) {
                cell.appendChild(document.createElement('span'));
                cell.lastElementChild.appendChild(document.createTextNode('0'));
                cell.lastElementChild.className = 'nybble';
                cell.lastElementChild.id = 'nyb'+nyb;
                cell.lastElementChild.onclick = sel;
                nyb += 1;
            }
        }
    }
    
    let theBody = this.body;
    
    this._lastfocus = 'nyb0';
    this.body.tabIndex = 1; // makes it focusable so we can listen to key events
    this.body.onfocus = function() {
        //if (document.querySelectorAll('.cursor').length == 0)
            //theBody.querySelector('.nybble').onclick();
        if (document.querySelectorAll('.cursor').length == 0)
            document.getElementById(theBody.owner._lastfocus).onclick();
    }
    this.body.onblur = function() {
        theBody.querySelectorAll('.cursor').forEach(function(x){ theBody.owner._lastfocus = x.id; x.classList.remove('cursor'); });
    }
    this.body.owner = this;
    this._setNybble = function(nyb, val) {
        let str, num, span;
        if ('string' == typeof val) { str = val.toUpperCase(); num = Number('0x'+str); }
        else { num = val&0xf; str = Number(num).toString(16).toUpperCase(); }
        if ('object' == typeof nyb) { span = nyb; nyb = Number(span.id.substr(3)); }
        else { span = document.getElementById('nyb'+nyb); }
        if (str == span.innerText) return false;
        let i = Math.floor(nyb/2);
        let o = nyb - i*2;
        if (o) this.bytes[i] = (this.bytes[i]&0xf0) | (num   );
        else   this.bytes[i] = (this.bytes[i]&0x0f) | (num<<4);
        span.innerText = str;
        let empty = true;
        let j0 = i&0xfffffff0;
        for(let j = i&0xfffffff0; j <= (i|0xf); j+=1) { if (this.bytes[j] != 0) { empty = false; break; } }
        let row = span.parentElement.parentElement;
        row.classList.add(empty ? 'empty' : 'full');
        row.classList.remove(empty ? 'full' : 'empty');
        return true;
    }
    this.body.onkeydown = function(event) {
        event = event || window.event;
        active = this.querySelector('.cursor');
        if (active == null) return;
        let put = null;
        let code = event.charCode || event.keyCode;
        let off = 0;
        let num = Number('0x'+event.key);
        if (!Number.isNaN(num) && num < 0x10) {
            this.owner._setNybble(active, event.key);
            off = 1;
        } else {
            if (code == 37 || event.key == 'ArrowLeft') off = -1;
            if (code == 38 || event.key == 'ArrowUp') off = -32;
            if (code == 39 || event.key == 'ArrowRight') off = 1;
            if (code == 40 || event.key == 'ArrowDown') off = 32;
        }
        if (off != 0) {
            let idx = Number(active.id.substr(3));
            let newc = this.querySelector('#nyb'+(idx+off));
            if (newc !== null) {
                active.classList.remove('cursor');
                active.parentElement.parentElement.classList.remove('active');
                newc.parentElement.parentElement.classList.add('active');
                newc.classList.add('cursor');
            }
            return false;
        }
    }
}

/**
 * The main instantiation function. To initialize, create a div and call
 * 
 * myHexBankObject.replaceElement(myDiv)
 */
HexBank.prototype.replaceElement = function(element) {
    if ('string' == typeof element) element = document.getElementById(element);
    if (element == null) throw new Exception('Cannot replace a null element');
    
    if (this.body.parentNode == null) {
        // at front to facilitate overriding by later elements
        document.head.insertBefore(this.style, document.head.firstChild);
    }
    this.body.id = element.id;
    this.body.style = element.style;
    element.replaceWith(this.body);
}

/** Load a binary file directly into the editor */
HexBank.prototype.readBinaryFiles = function(fileList) {
    if (fileList.length != 1) return;
    var fr = new FileReader();
    let me = this;
    fr.onload = function(evt) {
        var data = evt.target.result;
        var bytes = new Uint8Array(data.length);
        for(let i=0; i<data.length; i+=1) bytes[i] = data.charCodeAt(i);
        me.writeArray(0, bytes);
    }
    fr.readAsBinaryString(fileList[0]);
}

/** Load an ascii file containing whitespace-separated hex bytes directly into the editor */
HexBank.prototype.readASCIIFiles = function(fileList) {
    if (fileList.length != 1) return;
    var fr = new FileReader();
    let me = this;
    fr.onload = function(evt) {
        var data = evt.target.result.trim().split(/\s+/g);
        var bytes = new Uint8Array(data.length);
        for(let i=0; i<data.length; i+=1) bytes[i] = Number.parseInt(data[i], 16);
        me.writeArray(0, bytes);
    }
    fr.readAsBinaryString(fileList[0]);
}


/** Reading functions, for returning contents of the bytes array as numbers or arrays*/
HexBank.prototype.readArray = function(addr, size) {
    for(let i=addr*2; i<(addr+size)*2; i+=1)
        document.getElementById('nyb'+i).classList.add('read');
    return this.bytes.slice(addr, addr+size);
}
/// ditto
HexBank.prototype._readLE = function(addr, size) {
    let tmp = this.readArray(addr, size);
    let ans = 0;
    for(let i=size-1; i>=0; i-=1) { ans *= 0x100; ans += tmp[i]; }
    return ans;
}
/// ditto
HexBank.prototype._readBE = function(addr, size) {
    let tmp = this.readArray(addr, size);
    let ans = 0;
    for(let i=0; i<=size; i+=1) { ans *= 0x100; ans += tmp[i]; }
    return ans;
}

/// ditto
HexBank.prototype.read8 = function(addr) {
    return this.readArray(addr, 1)[0];
}
/// ditto
HexBank.prototype.read16le = function(addr) {
    return this._readLE(addr, 2);
}
/// ditto
HexBank.prototype.read16be = function(addr) {
    return this._readBE(addr, 2);
}
/// ditto
HexBank.prototype.read32le = function(addr) {
    return this._readLE(addr, 4);
}
/// ditto
HexBank.prototype.read32be = function(addr) {
    return this._readBE(addr, 4);
}
/** javascript Numbers are 52-bit-mantissa floats; thus can read 48 bits, but not bitwise-operate on them */
HexBank.prototype.read48le = function(addr) {
    return this._readLE(addr, 6);
}
/** javascript Numbers are 52-bit-mantissa floats; thus can read 48 bits, but not bitwise-operate on them */
HexBank.prototype.read48be = function(addr) {
    return this._readBE(addr, 6);
}


/** Writing functions, for placing numbers of lists of bytes into the bytes array */
HexBank.prototype.writeArray = function(addr, array, bytes) {
    if ('number' != typeof bytes) bytes = array.length;
    for(let i=0; i<bytes; i+=1) {
        let sp = document.getElementById('nyb'+((addr+i)*2));
        sp.classList.add('write');
        this._setNybble(sp, array[i]>>4);
        sp = document.getElementById('nyb'+((addr+i)*2+1));
        sp.classList.add('write');
        this._setNybble(sp, array[i]&0xf);
    }
}

/// ditto
HexBank.prototype.write8 = function(addr, value) {
    this.writeArray(addr, [value]);
}
/// ditto
HexBank.prototype.write16le = function(addr, value) {
    this.writeArray(addr, [value&0xff, value>>8]);
}
/// ditto
HexBank.prototype.write16be = function(addr, value) {
    this.writeArray(addr, [value>>8, value&0xff]);
}
/// ditto
HexBank.prototype.write32le = function(addr, value) {
    this.writeArray(addr, [value&0xff, (value>>8)&0xff, (value>>16)&0xff, (value>>24)&0xff]);
}
/// ditto
HexBank.prototype.write32be = function(addr, value) {
    this.writeArray(addr, [(value>>24)&0xff, (value>>16)&0xff, (value>>8)&0xff, value&0xff]);
}
/// ditto
HexBank.prototype.write48le = function(addr, value) {
    this.write16le(addr, value);
    this.write32le(addr+2, value/0x10000);
}
/// ditto
HexBank.prototype.write48be = function(addr, value) {
    this.write32be(addr, value/0x10000);
    this.write16be(addr+4, value);
}
