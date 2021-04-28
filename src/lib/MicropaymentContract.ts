/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { Context } from 'fabric-contract-api';
import { BlockotusContract } from 'hyperledger-fabric-chaincode-helper';
import { HashRedeem } from './models/Commitment';
import { SignedDownloadIntention } from './models/DownloadIntention';
import { SignatureValidator } from './tools/SignatureValidator';
import { State } from './tools/State';
import sha256 from 'crypto-js/sha256';


export class MicroPaymentContract extends BlockotusContract {

    constructor(...args) {
        super(...args);
    }

    public async declareDownloadIntention(ctx: Context, signedDownloadIntention: string){
        // check torrent id number of blocks; TODO
        // check if payer public key has enough funds; TODO
        // move funds from payer to smart contract wallet; TODO
        const reservedFunds = 50;
        
        // create update state to blockchain;
        const parsedSignedDownloadIntention: SignedDownloadIntention = JSON.parse(signedDownloadIntention);

        if(!SignatureValidator.verifyDownloadIntention(parsedSignedDownloadIntention)){
            return ("Invalid signature.");
        }

        const torrentId = parsedSignedDownloadIntention.downloadIntention.torrentId;
        const payer = parsedSignedDownloadIntention.downloadIntention.payerPublicKey;
        
        var downloadIntentions = await State.getState(ctx, "currentDownloadIntentions");

        !downloadIntentions && (downloadIntentions = {});
        !downloadIntentions[torrentId] && (downloadIntentions[torrentId] = {});
        
        if (downloadIntentions[torrentId][payer]){
            return ("Download intention already exist.");
        }
        else {
            downloadIntentions[torrentId][payer] = {
                currentFunds: reservedFunds
            }
        }

        await State.putState(ctx, "currentDownloadIntentions", downloadIntentions);
        return (downloadIntentions);
    }

    public async listDownloadIntentions(ctx: Context){
        return await State.getState(ctx, "currentDownloadIntentions");
    }

    public redeemPayment(ctx: Context, redeemRequest: string){
        const redeemRequestObject: HashRedeem = JSON.parse(redeemRequest);
        // assert signature validity;
        if (!SignatureValidator.verifyPaymentRedeem(redeemRequestObject)){
            return ("invalid commit")
        }

        // assert hash validity
        var currentHash = redeemRequestObject.hash;
        for (let index = 0; index < redeemRequestObject.index; index++) {
            currentHash = sha256(currentHash).toString();
        }
        if (currentHash !== redeemRequestObject.commitment.content.hashRoot){
            return ("invalid payment hash");
        }

        // move funds
    }
}
