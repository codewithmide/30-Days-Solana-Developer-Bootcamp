import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import 'dotenv/config'

const solana_keypair = getKeypairFromEnvironment("SOLANA_SECRET_KEY");

console.log(`The public key is: `, solana_keypair.publicKey.toBase58());
console.log(`The secret key is: `, solana_keypair.secretKey);
console.log("✅  Secret key is being generated from a .env file!");
console.log("✅ Finished!");