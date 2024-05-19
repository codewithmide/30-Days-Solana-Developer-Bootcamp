import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers"
import { Connection, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("7ETjLBDum3qGdBijYnhT3TBPgwyTEq2h6tsQ1V8Hv4Vf");

const metadataData = {
    name: "Superteam Uyo Devs",
    symbol: "SUD",
    uri: "https://arweave.net/HWgDqnvctLLwEJXgfBbWKxwfk26KvPR73EZUPr9m-ls",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}

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

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
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
        }
    }
)

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection, transaction, [user]
);

const transactionLink = getExplorerLink(
    "transaction", transactionSignature, "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
