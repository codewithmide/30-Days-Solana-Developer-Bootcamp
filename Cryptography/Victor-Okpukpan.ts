import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { config } from "dotenv";

config({ path: "../.env" });

const publicAndPrivateKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  "This is the public key:",
  publicAndPrivateKeyPair.publicKey.toBase58()
);
console.log("This is the private key:", publicAndPrivateKeyPair.secretKey);
console.log("Keypair generated from environment variable!");
