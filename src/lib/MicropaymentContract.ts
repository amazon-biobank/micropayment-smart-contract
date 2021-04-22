/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { BlockotusContract } from 'hyperledger-fabric-chaincode-helper';

import type { Context } from 'fabric-contract-api';

export class MicroPaymentContract extends BlockotusContract {

    constructor(...args) {
        super(...args);
    }

    public async initLedger() {
        console.log('initLedger');
    }

    public helloWorld(ctx: Context) {
        const params = this.getParams(ctx);
        return `Hello ${params[0]}`;
    }

}
