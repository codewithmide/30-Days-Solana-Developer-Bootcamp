// Minting
// Transferring tokens from one holder to another
import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey("7ETjLBDum3qGdBijYnhT3TBPgwyTEq2h6tsQ1V8Hv4Vf");

const recipientAssociatedTokenAccount = new PublicKey(
    "7ETjLBDum3qGdBijYnhT3TBPgwyTEq2h6tsQ1V8Hv4Vf"
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);