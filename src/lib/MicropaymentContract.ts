/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { Context } from 'fabric-contract-api';
import { BlockotusContract } from 'hyperledger-fabric-chaincode-helper';
import { SignedDownloadIntention } from './models/DownloadIntention';
import { State } from './tools/State';


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

    public redeemPayment(ctx: Context){

    }
}
