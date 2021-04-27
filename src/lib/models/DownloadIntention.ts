export type DownloadIntention = {
    torrentId: string,
    payerPublicKey: string
}

export type SignedDownloadIntention = {
    downloadIntention: DownloadIntention,
    signature: string
}

export type RegisteredDownloadIntention = {
    [payerPublicKey: string]: {
        currentFunds: number;
    }
} 

export type RegisteredDownloadIntentions = {
    [torrentId: string]: RegisteredDownloadIntention;
}

export type WorldStateDownloadIntentions = {
    currentDownloadsIntention: RegisteredDownloadIntentions;
}