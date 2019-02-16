# Blockchain Project
A customer shops on a merchant website and  orders goods.
A QR Code is generated. It contains the Merchant Hashcode, Amount and the TransactionID
Using Blockchain Wallet, scan the QR Code and accept payments.
The Blockchain Customer HashCode, MerchantHashCode, Amount and the TransactionID is sent to the Blockchain network.
A confirmation receipt ID is sent to the merchant website to confirm payments.
The transaction details which includes Amount, BlockchainCustomer Hashcode, Merchant HashCode and the TransactionID is sent across to all miners subscribed to the Blockchain Network.
Each miner will retrieve the previous hashcode of the merchant (Only those that passed consensus or reconciliation) and the last index.

A Copy of the transaction details will be sent to the cassandra distributed DB.

Proof of work will begin immediately for each nodes of miners using crypto-js\sha256 to generate nonce. This will include Previoushashcode and the transactiondetails. The result must be "0000"+hashcode.

Any Miners that will complete by getting the accepted Cryptographic Hashcode will notify the rest of the nodes of miners on the blockchain.



Will send the nonce, previousHashcode and NewHashcode to the network. 

Each Miner will verify and save the Block locally.


![alt text](https://github.com/izzumani/Blockchain_Project/blob/master/png/Blockchain%20Dataflow%20chart.png)

