import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  try {
    const user = getKeypairFromEnvironment("SOLANA_SECRET_KEY");
    const connection = new Connection(clusterApiUrl("devnet"));

    console.log(
      `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
    );

    const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" //soldev metadata
    );

    // Substitute in your token mint account
    const tokenMintAccount = new PublicKey(
      "6vwCrpzcv5SRjZnJaJpezuLik8YuvuSWtJHbNqoBmPMp" //explorer token address
    );

    const metadataData = {
      name: "UnclePhil Token", // Ensure this name is <= 32 characters
      symbol: "PUN",
      uri: "https://app.ardrive.io/#/file/ad53a03d-4b5a-466b-ad4f-88c09beecce6/view",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    const metadataPDAAndBump = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );

    const metadataPDA = metadataPDAAndBump[0];

    const transaction = new Transaction();

    const createMetadataAccountInstruction =
      createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: tokenMintAccount,
          mintAuthority: user.publicKey,
          payer: user.publicKey,
          updateAuthority: user.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,
          },
        }
      );

    transaction.add(createMetadataAccountInstruction);

    const transactionSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [user]
    );

    const transactionLink = getExplorerLink(
      "transaction",
      transactionSignature,
      "devnet"
    );

    console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

    const tokenMintLink = getExplorerLink(
      "address",
      tokenMintAccount.toString(),
      "devnet"
    );

    console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
  } catch (error) {
    console.error(`Failed to create token metadata: ${error.message}`);
  }
})();
