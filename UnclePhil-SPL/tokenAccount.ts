import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SOLANA_SECRET_KEY");

console.log(
  `Connection estabished and Public key: ${user.publicKey.toBase58()}`
);

// CREATING A CONSTANT VERIABLE FOR ACCOUNT ADDRESSES
const Token_Mint_Account = "6vwCrpzcv5SRjZnJaJpezuLik8YuvuSWtJHbNqoBmPMp"; //explorer token address
const Recipient_Account = "xrwPFQEZCqFwLjtQC8Xg2FPPaoAh6enjE8ZG6Gj7gr5"; //solana phantom address

// UPDATING THE DECLEARED ADDRESSES INTO THE NEW PUBLICkEY VIRIABLES
const tokenMintAccount = new PublicKey(Token_Mint_Account);
const recipientAccount = new PublicKey(Recipient_Account);

// CREATING A TOKEN ACCOUNT 
async function createTokenAccoount() {
  try {
    // CREATING A NEW TOKEN ACCOUNT
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      user,
      tokenMintAccount,
      recipientAccount
    );

    console.log("New Token Account", tokenAccount.address.toBase58());

    // EXPLORER LINK TO VIEW THE TOKEN ACCOUNT
    const ExplorerLink = getExplorerLink(
      "address",
      tokenAccount.address.toBase58(),
      "devnet"
    );

    console.log(`Created token account: ${ExplorerLink}`);
  } catch (error) {
    console.log("Error creating a token account", error);
  }
};

createTokenAccoount();
