import { SignedDownloadIntention } from "../models/DownloadIntention";
import elliptic from 'elliptic';
import { HashRedeem } from "../models/Commitment";

export class SignatureValidator{
    public static verifyDownloadIntention(signedDownloadIntention: SignedDownloadIntention): boolean {
        const payerPublicKeyString = signedDownloadIntention.downloadIntention.payerPublicKey;

        const EC = elliptic.ec;
        const ecdsaCurve = elliptic.curves['p256'];
        const ecdsa = new EC(ecdsaCurve);

        const signatureBytes = Buffer.from(signedDownloadIntention.signature, 'base64');
        const messageBytes = Buffer.from(JSON.stringify(signedDownloadIntention.downloadIntention));
        const payerPublicKey = ecdsa.keyFromPublic(payerPublicKeyString, 'hex');

        return payerPublicKey.verify(messageBytes, signatureBytes);
    }
 
    public static verifyPaymentRedeem(signedPaymentRedeem: HashRedeem): boolean {
        const payerPublicKeyString = signedPaymentRedeem.commitment.content.payerPublicKey;

        const EC = elliptic.ec;
        const ecdsaCurve = elliptic.curves['p256'];
        const ecdsa = new EC(ecdsaCurve);

        const signatureBytes = Buffer.from(signedPaymentRedeem.commitment.signature, 'base64');
        const messageBytes = Buffer.from(JSON.stringify(signedPaymentRedeem.commitment.content));
        const payerPublicKey = ecdsa.keyFromPublic(payerPublicKeyString, 'hex');

        return payerPublicKey.verify(messageBytes, signatureBytes);
    }
}