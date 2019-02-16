# Blockchain Project
A customer shops on a merchant website and  orders goods.

A QR Code is generated. It contains the Merchant Hashcode, Amount and the TransactionID.

Using Blockchain Wallet, scan the QR Code and accept payments.

The Blockchain Customer HashCode, MerchantHashCode, Amount and the TransactionID is sent to the Blockchain network.

A confirmation receipt ID is sent to the awaiting merchant website to as a confirmation of payments.

The transaction details which includes the Amount, the BlockchainCustomer Hashcode, Merchant HashCode and the TransactionID is sent  to all miners subscribed to the Blockchain Network.

Each miner will retrieve the previous hashcode of the merchant (Only verified at consensus or reconciliation) and the last index.

A Copy of the block transaction details will be sent to the cassandra DB.

Proof of work will begin immediately for each nodes of miners using crypto-js\sha256 to generate nonce. The parameters include Previoushashcode and the transactiondetails. The expected result is format "0000"+anycharacter.

The Miners that will complete by getting the accepted Cryptographic Hashcode format will notify the other nodes of miners on the blockchain.


Will send the nonce, previousHashcode and NewHashcode to the network. 

Each Miner will verify and save the Block locally.


![alt text](https://github.com/izzumani/Blockchain_Project/blob/master/png/Blockchain%20Dataflow%20chart.png)

