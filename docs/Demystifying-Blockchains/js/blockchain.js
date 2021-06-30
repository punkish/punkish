// https://medium.freecodecamp.org/how-does-blockchain-really-work-i-built-an-app-to-show-you-6b70cd4caf7d
// https://codingislove.com/simple-blockchain-javascript/

class Block {
	constructor(index, timestamp, data, prevHash, thisHash, nonce) {
		this.index = index;
        this.timestamp = timestamp;
		this.data = data;
        this.prevHash = prevHash;
        this.thisHash = thisHash;``
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
    
    addBlock(data, pow, nd, clearInput) {
        let index = this.chain.length;
        let prevHash = '';
        let thisHash = '';
        let timestamp = new Date().getTime();
        let nonce = 0;
        
        if (index) {
            const lb = this.lastBlock();
            prevHash = lb.thisHash;
        }
        else {
            index = 0;
		}
		
		let self = this;
		function* calcPow() {
			try {
				while(!self.isValidHashDifficulty(thisHash)) {
					nonce = nonce + 1;
					thisHash = self.getHash(index, prevHash, timestamp, data, nonce);
					yield pow.innerHTML = `calculating Proof of Work: ${nonce.toString()}`;
				}
			} 
			finally {
				pow.innerHTML = `Proof of Work is ${nonce}`;
				clearInterval(timer);
				const block = new Block(index, timestamp, data, prevHash, thisHash, nonce);
				self.chain.push(block);
				
				clearInput();
				const newdata = JSON.stringify(self.chain, null, 2);
				for (let i = 0, j = nd.length; i < j; i++) {
					nd[i].innerHTML = newdata;
				}

				hljs.initHighlighting();
			}
		}
		
		let it = calcPow();
		let timer = setInterval(() => it.next(), 10)
    }

    getHash(index, prevHash, timestamp, data, nonce) {
        const str = index + prevHash + timestamp + JSON.stringify(data) + nonce;
        return CryptoJS.SHA256(str).toString();
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