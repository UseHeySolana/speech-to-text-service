import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from 'bip39';

export const getKeypairFromMnemonic = async (mnemonic: string): Promise<Keypair> => {
    if (isJson(mnemonic)) {
        const keyPair = Keypair?.fromSecretKey(Uint8Array.from(JSON.parse(mnemonic)));

        return keyPair;
    } else {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;

        const keyPair = Keypair.fromSeed(derivedSeed);
        return keyPair;
    }
};



export const isJson = (str: any) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}