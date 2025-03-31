"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = exports.getKeypairFromMnemonic = void 0;
const web3_js_1 = require("@solana/web3.js");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const bip39 = __importStar(require("bip39"));
const getKeypairFromMnemonic = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, exports.isJson)(mnemonic)) {
        const keyPair = web3_js_1.Keypair === null || web3_js_1.Keypair === void 0 ? void 0 : web3_js_1.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(mnemonic)));
        return keyPair;
    }
    else {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const derivedSeed = (0, ed25519_hd_key_1.derivePath)("m/44'/501'/0'/0'", seed.toString('hex')).key;
        const keyPair = web3_js_1.Keypair.fromSeed(derivedSeed);
        return keyPair;
    }
});
exports.getKeypairFromMnemonic = getKeypairFromMnemonic;
const isJson = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.isJson = isJson;
