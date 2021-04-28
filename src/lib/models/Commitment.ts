export type CommitmentMessage = {
    content: CommitmentContent,
    signature: string
}

export type CommitmentContent = {
    torrentId: string
    payerPublicKey: string,
    receiverPublicKey: string,
    hashRoot: string
}

export type HashRedeem = {
    commitment: CommitmentMessage,
    hash: string,
    index: number
}