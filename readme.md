# Blockchain Project



# Blockchain Study Scenario
A customer shops on a merchant website and  orders goods.

A QR Code is generated. It contains the Merchant Public Key reference, Amount and the Order Reference Number.

Using Blockchain Wallet, scan the QR Code and accept payments.

The customer will select coin(s) for use of payment (cases where they have mutiple denomination of coins in the wallet).

The full Amount is confirmed and a Cryptocurrency validation is done using the prescribed Customer private key.

The transaction is sent to the blockchain network to commence transactions

The Mechant Amount is deducted from the Amount Received

A  processing Fee of 0.05% is charged on the transaction is deducted from the amount received

If there is change from Coin(s) paid  , The Amount knowna as UTXO is sent to the customer wallet on the provided Address .

A confirmation receipt ID is sent to the awaiting merchant website  to confirm payments received will start shipping the goods.

Merchant transaction is queued until mining done.

Transactions details are sent to the Blockchain network Mempool.

Miners will pick pending transaction. 

Using the previousHashcode, index and the transaction received, Proof of work will begin immediately for all the terminodes  of miners using crypto-js\sha256 to generate nonce. The hash algorithm as expected result is format "0000"+anycharacter.

The one that will get the correct hashcode, will notify the blockchain network and Others miners will halt the mining process.


The successful Miner use the nonce and generate the newhashcode.

The Blockchain will be sent to all the nodes on the network.


The Merchant will receive a confirmation of the Successful mining.

The mining process for the specific  miner terminode will stop if its disconnect from the network.


![alt text](https://github.com/izzumani/Blockchain_Project/blob/master/png/Blockchain%20Dataflow%20chart.png)

