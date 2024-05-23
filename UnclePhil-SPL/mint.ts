import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

(async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const user = getKeypairFromEnvironment("SOLANA_SECRET_KEY");

    console.log(`🔑 Loaded user keypair with public key: ${user.publicKey.toBase58()}`);

    const UNIT = Math.pow(10, 2);
    const tokenMintAccount = new PublicKey("6vwCrpzcv5SRjZnJaJpezuLik8YuvuSWtJHbNqoBmPMp"); //explorer solana token address
    const recipient = new PublicKey("47AzsyvjaPrd5eTwqveP4NSf1Fkq4ACbDfaAo6Kof36J"); // generated address

    // Ensure the recipient has an associated token account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      user,
      tokenMintAccount,
      recipient
    );

    console.log(`Recipient's associated token account: ${recipientTokenAccount.address.toBase58()}`);

    // Mint tokens to the recipient's associated token account
    const transactionSignature = await mintTo(
      connection,
      user,
      tokenMintAccount,
      recipientTokenAccount.address,
      user,
      100 * UNIT
    );

    const link = getExplorerLink(
      "transaction",
      transactionSignature,
      "devnet"
    );

    console.log(`✅ Successfully minted tokens. Transaction: ${link}`);
  } catch (error) {
    console.error(`Failed to mint tokens: ${error.message}`);
  }
})();
