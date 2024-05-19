// Token Mint
// To create a new SPL Token you first have to create a Token Mint. A Token Mint is an account that holds data about a specific token.
// createMint function returns the publicKey
import { createMint } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

const tokenMint = await createMint(connection, user, user.publicKey, user.publicKey, 2);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Finished! Created token mint: ${link}`);


// Creating Token Accounts
// Before you can mint tokens (issue new supply), you need a Token Account to hold the newly issued tokens.


