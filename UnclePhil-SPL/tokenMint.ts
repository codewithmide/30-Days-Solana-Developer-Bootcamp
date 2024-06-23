import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import "dotenv/config";

(async () => {
  // Defining the publickKey and Secret key of a User
  const user = getKeypairFromEnvironment("SOLANA_SECRET_KEY");
  const connection = new Connection(clusterApiUrl("devnet"));

  console.log(
    `Connection established, here is the public key:`,
    user.publicKey.toBase58()
  );

  try {
    // CREATING A NEW TOKEN MINT FOR THE SPL.
    const tokenMint = await createMint(
      connection,
      user,
      user.publicKey,
      user.publicKey,
      2
    );

    // Creating the publicAddressKey
    const publicAddressLink = getExplorerLink(
      "address",
      tokenMint.toBase58(),
      "devnet"
    );
    console.log(`Token Mint created successfully:`, publicAddressLink);
  } catch (error) {
    console.error(`Failed to create token mint:`, error.message);
  }
})();
