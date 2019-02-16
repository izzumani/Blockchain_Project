module.exports = class Blockchain {


    constructor ()
    {
        this.chain =[];
        this.pendingTransaction =[];
        this.createNewBlock(0,"0","0");
    }

     createNewBlock (nonce,previousBlockHash,hash)
    {
        const newBlock ={
            index : this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransaction,
            nonce:nonce,
            hash:hash,
            previousBlockHash:previousBlockHash
        }
        this.pendingTransaction = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLastBlock ()
    {

        return this.chain[this.chain.length -1];
    }

    createNewTransaction (amount,sender,recipient, orderReferenceNumber)
    {
        const newTransaction ={
            amount:amount,
            sender: sender,
            recipient:recipient,
            transactionId : orderReferenceNumber
        };

       return newTransaction; 
    }

    addTransactionToPendingTransactions(transactionObj)
    {
        this.pendingTransaction.push(transactionObj);
        return  this.getLastBlock() ['index'] +1;
    }

    hashBlock (previousBlockHash,currentBlockData,nonce)
    {
        const dataString =previousBlockHash + nonce.toString()+JSON.stringify(currentBlockData);
        const hash = sha256(dataString);
        return hash;
    }

    proofOfWork (previousBlockHash,currentBlockData)
    {
        let nonce = 0;
        let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
        while (hash.substring(0,4) !=='0000'){
            nonce++;
            hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);

            
        }
        return nonce;
    }


}