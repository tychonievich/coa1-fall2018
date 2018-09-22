function Registers(sizeBits) {
    this.store = {}
    let digs = Math.ceil(sizeBits/4);
    this.format = function(num) {
        if (digs < 16 && digs > 0) num &= (1<<(digs*4))-1;
        return Number(num).toString(16).toUpperCase().padStart(digs, '0');
    }
    
    this.body = document.createElement('table');
    this.body.className = 'regfile';
    
    this.style = document.createElement('style');
    this.style.appendChild(document.createTextNode(`
        .regfile { border-collapse:collapse; border: thin solid white; }
        .regfile td:first-child { color: rgba(0,0,0,0.5); text-align:right;  }
        .regfile td:first-child:after { content:" = "; }
        .regfile td:nth-child(n+1) { font-family: monospace; }
    `)); // work around webkit bug; insertRule more efficient, but webkit won't let it work with an empty body
}


/**
 * The main instantiation function. To initialize, create a div and call
 * 
 * myRegistersObject.replaceElement(myDiv)
 */
Registers.prototype.replaceElement = function(element) {
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

/** Assign a value to a register, updating the display to show this was done */
Registers.prototype.setR = function(idx, val) {
    let rows = this.body.rows;
    this.store[idx] = val;
    for(let i=0; i<rows.length; i+=1) {
        let row = rows[i];
        let name = rows[i].firstChild.innerText;
        if (name == idx) {
            rows[i].lastChild.innerText = this.format(val);
            rows[i].lastChild.classList.add('write');
            return;
        } else if (name > idx) {
            let tr = document.createElement('tr');
            tr.insertCell().innerText = idx;
            tr.insertCell().innerText = this.format(val);
            tr.lastElementChild.id = 'R['+idx+']';
            row.parentElement.insertBefore(tr, row);
            if (idx == 0) tr.style.borderTop = 'thin solid rgba(0,0,0,0.5)';
            return;
        }
    }
    let tr = this.body.insertRow();
    tr.insertCell().innerText = idx;
    tr.insertCell().innerText = this.format(val);
    tr.lastElementChild.id = 'R['+idx+']';
    if (idx == 0) tr.style.borderTop = 'thin solid rgba(0,0,0,0.5)';
}
/** Retrieve a value from a register, updating the display to show this was done */
Registers.prototype.getR = function(idx) {
    if (idx in this.store) {
        document.getElementById('R['+idx+']').classList.add('read');
        return this.store[idx];
    }
    return 0;
}
