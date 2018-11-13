const SHA256 = require('crypto-js/sha256');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('bc.json');
const db = low(adapter);

// https://medium.freecodecamp.org/how-does-blockchain-really-work-i-built-an-app-to-show-you-6b70cd4caf7d
// https://codingislove.com/simple-blockchain-javascript/

class Block {
	constructor(index, timestamp, data, prevHash, thisHash, nonce) {
		this.index = index;
        this.timestamp = timestamp;
		this.data = data;
        this.prevHash = prevHash;
        this.thisHash = thisHash;
        this.nonce = nonce;
    }
}

class BlockChain {
	constructor() {
        this.chain = [];
        this.difficulty = 2;
    }

    lastBlock() {
        return this.chain[this.chain.length - 1]
    }
    
    addBlock(data) {
        let index = this.chain.length;
        let prevHash = '';
        let thisHash = '';
        let timestamp = new Date().getTime() / 1000;
        let nonce = 0;
        
        if (index) {
            const lb = this.lastBlock();
            prevHash = lb.thisHash;
        }
        else {
            index = 0;
        }

        while (!this.isValidHashDifficulty(thisHash)) {     
            nonce = nonce + 1;
            process.stdout.write('\r' + nonce.toString());
            thisHash = this.getHash(index, prevHash, timestamp, data, nonce);
        }

        console.log('\nProof of Work is ' + nonce);

        const block = new Block(index, timestamp, data, prevHash, thisHash, nonce);
        this.chain.push(block);

        db.get('bc').write();
    }

    getHash(index, prevHash, timestamp, data, nonce) {
        const str = index + prevHash + timestamp + JSON.stringify(data) + nonce;
        return SHA256(str).toString();
    }

    isValidHashDifficulty(hash) {
        let i = 0;
        let j = hash.length;
        for (; i < j; i ++) {
            if (hash[i] !== '0') {
                break;
            }
        }

        return i === this.difficulty;
    }

    chainIsValid() {

        for (let i = 0, j = this.chain.length; i < j; i++) {
    
            const h = this.chain[i];
            if (h.thisHash !== this.getHash(h.index, h.prevHash, h.timestamp, h.data, h.nonce)) {
                return false;
            }
            
            if (i > 0 && h.prevHash !== this.chain[i - 1].thisHash) {
                return false;
            }
        }
    
        return true;
    }

    recomputeChain() {

        const start = new Date().getTime();

        for (let i = 0, j = this.chain.length; i < j; i++) {
    
            process.stdout.write('block ' + i + '… ');
            const h = this.chain[i];
            let nonce = 0;
            let thisHash = '';
            while (!this.isValidHashDifficulty(thisHash)) {     
                nonce = nonce + 1;
                process.stdout.write('\r' + nonce.toString());
                h.thisHash = this.getHash(h.index, h.prevHash, h.timestamp, h.data, h.nonce);
            }

            console.log('\nProof of Work is ' + nonce);
        }

        const end = new Date().getTime();
        const time = end - start;
        console.log('\nRecomputing the chain took: ' + time);
    }
}

const bc = new BlockChain();

const blocks = db.get('bc.chain').value();

if (blocks.length) {

    bc.chain = blocks;
}
else {

    // Set some defaults (required if your JSON file is empty)
    db.defaults({ 'bc': bc }).write();
}

module.exports = bc;