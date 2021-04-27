# Micropayment Contract

This repository consist of the implementation of a micropayment smart contract in Typescript for the Hyperledger Fabric Network.

# How to test

Download vscode extension: `IBM Blockchain platform`.

In the smart contracts tab, choose the option `Package Open Project`.

In the fabric environments click on 1 Org Local Fabri start (Be patient, it takes time)

On fabric environments, click on `Deploy smart contract`. Choose the packaged smart contract.

On fabric gateways, choose the micropayment contract and interact with each method.

# Chaincode Features

## declareDownloadIntention (downloadIntention)

Update world state in `currentDownloadIntentions` by adding inside the `torrentId` identifier the `payerPublicKey`.

If it already exist, it only returns that it already exist and doesn't commit anything to the blockchain.

TODO:
Must realocate funds from the payer to the chaincode `reservedFunds`.

TODO:
Must assert that the signature is valid

TODO:
Must assert that the payer have enough funds to proceed

## listDownloadIntentions

Simply return all the download intentions registered in the blockchain

## redeemPayment
TODO