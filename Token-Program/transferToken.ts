import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

const recipient = new PublicKey("Bs31qdXYmgVLmBBrwnsS6f3VYbLuiirtEA3tQMDJ5KCb");
const tokenMintAccount = new PublicKey("7592SNYRVqy95Bk3Uhk3HW9kurNPGAMtJnomz1KpZSbZ");
const UNIT = Math.pow(10, 2);

console.log(`Attempting to send 10 SUD token to ${recipient.toBase58()}...`);

async function transferToken() {
  try {
    const sourcedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenMintAccount,
      sender.publicKey,
    );

    const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenMintAccount,
      recipient
    );

    const transactionSignature = await transfer(
      connection,
      sender,
      sourcedTokenAccount.address,
      destinationTokenAccount.address,
      sender,
      10 * UNIT,
    );

    const link = getExplorerLink(
      "transaction",
      transactionSignature,
      "devnet"
    );

    console.log(`Successfully sent 10 SUD to this address: ${link}`);
  } catch (error) {
    console.error("Error during token transfer:", error);
  }
}

transferToken();
