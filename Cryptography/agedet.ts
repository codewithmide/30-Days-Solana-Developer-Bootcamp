import "dotenv/config";
import {Keypair } from "@solana/web3.js";

const private_key = process.env.SECRET_KEY;

console.log("The Private key is: ", private_key);
console.log("The keypair is generated");