import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Connection estabished and this is my public key ${user.publicKey.toBase58()}`)


const tokenMintAccount = new PublicKey("7592SNYRVqy95Bk3Uhk3HW9kurNPGAMtJnomz1KpZSbZ");
const recipient = new PublicKey("DfFBCJhurNS19MQbkrZLru1oTuksghxDKUd8hvDgXrvb");

async function createTokenAccount() {
  try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      user,
      tokenMintAccount,
      recipient
    );

    console.log(`TokenAccount: ${tokenAccount.address.toBase58()}`);

    const link = getExplorerLink(
      "address",
      tokenAccount.address.toBase58(),
      "devnet"
    );

    console.log(`Created token account: ${link}`);
  } catch (error) {
    console.error("Error creating token account:", error);
  }
}

createTokenAccount();