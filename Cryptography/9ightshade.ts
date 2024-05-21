import { Keypair } from "@solana/web3.js";

require('dotenv').config();

const Loaded_key_pair = process.env.SECRET_KEY;

console.log(Loaded_key_pair);
const secret_Key_Array = JSON.parse(Loaded_key_pair);

console.log(secret_Key_Array);

const secret_key = Uint8Array.from(secret_Key_Array);

const solana_keypair = Keypair.fromSecretKey(secret_key);

console.log(`regenerated public key from secret key: ${solana_keypair.publicKey.toBase58()}`);

console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);

