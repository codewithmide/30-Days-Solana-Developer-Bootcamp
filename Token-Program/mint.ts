import { mintTo } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

const UNIT = Math.pow(10, 2);

const tokenMintAccount = new PublicKey("7592SNYRVqy95Bk3Uhk3HW9kurNPGAMtJnomz1KpZSbZ");
const recipient = new PublicKey("Dot1CjjzWvDFX8Vk6KxenZ47UdhrsMChCNwwKuQhWSMG");

const transctionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipient,
    user,
    100 * UNIT
)

const link = getExplorerLink(
    "address",
    transctionSignature,
    "devnet"
);

console.log(`Successfully minted tokens to this account: ${link}`);