import { initializeKeypair } from "./initializeKeypair"
import { Connection, clusterApiUrl, PublicKey, Keypair, Transaction } from "@solana/web3.js"
import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
    toMetaplexFile,
    NftWithToken,
} from "@metaplex-foundation/js"
import * as fs from "fs"
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token"

interface NftData {
    name: string
    symbol: string
    description: string
    sellerFeeBasisPoints: number
    imageFile: string
}

// example data for a new NFT
const nftData = {
    name: "SOL_TEST",
    symbol: "SOLT",
    description: "Testing the metaplex water",
    sellerFeeBasisPoints: 0,
    imageFile: "solana.png",
}

// example data for updating an existing NFT
const updateNftData = {
    name: "SOL_TEST",
    symbol: "SOLT",
    description: "Updating the nft",
    sellerFeeBasisPoints: 100,
    imageFile: "success.png",
}

const recipientAddresses = [
    "7gY4qmHUmPxWcLn8mCoqGfvoMFugpJadERxeRbmBH2JE",
];

async function main() {
    // create a new connection to the cluster's API
    const connection = new Connection(clusterApiUrl("devnet"))

    // initialize a keypair for the user
    const user = await initializeKeypair(connection)

    console.log("PublicKey:", user.publicKey.toBase58());

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(user))
        .use(
            bundlrStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            })
        )
  
    // upload the NFT data and get the URI for the metadata
    const uri = await uploadMetadata(metaplex, nftData);

    const nft = await createNft(metaplex, uri, nftData);

    const updateUri = await uploadMetadata(metaplex, updateNftData);

    await updateNFTUri(metaplex, updateUri, nft.address);

    // Transfer the NFT to all recipients
    await transferNftToRecipients(connection, nft.address, user, recipientAddresses);
}

async function uploadMetadata(metaplex: Metaplex, nftData: NftData): Promise<string> {
    const buffer = fs.readFileSync("src/" + nftData.imageFile);

    const file = toMetaplexFile(buffer, nftData.imageFile);

    const imageUri = await metaplex.storage().upload(file);

    console.log("Image URI: ", imageUri);

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: nftData.name,
        symbol: nftData.symbol,
        description: nftData.description,
        image: imageUri,
    });

    console.log("metadata uri: ", uri);
    return uri;
}

async function createNft(metaplex: Metaplex, uri: string, nftData: NftData): Promise<NftWithToken> {
    const { nft } = await metaplex.nfts().create(
        {
            uri: uri,
            name: nftData.name,
            sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
            symbol: nftData.symbol
        },
        { commitment: "finalized" },
    );

    console.log(
        `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
    );

    return nft;
}

async function updateNFTUri(metaplex: Metaplex, uri: string, mintAddress: PublicKey) {
    const nft = await metaplex.nfts().findByMint({ mintAddress });

    // update NFT metadata
    const { response } = await metaplex.nfts().update(
        {
            nftOrSft: nft,
            uri: uri,
        },
        { commitment: "finalized" },
    );

    console.log(
        `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
    );

    console.log(
        `Transaction: https://explorer.solana.com/tx/${response.signature}?cluster=devnet`,
    );
}

async function transferNftToRecipients(connection: Connection, mintAddress: PublicKey, user: Keypair, recipients: string[]) {
    for (const recipient of recipients) {
        try {
            const recipientPublicKey = new PublicKey(recipient);

            console.log(`Creating or retrieving token accounts for recipient: ${recipientPublicKey.toBase58()}`);
            
            const fromTokenAccount = await getAssociatedTokenAddress(
                mintAddress,
                user.publicKey
            );
            console.log(`From Token Account: ${fromTokenAccount.toBase58()}`);

            const toTokenAccount = await getAssociatedTokenAddress(
                mintAddress,
                recipientPublicKey
            );
            console.log(`To Token Account: ${toTokenAccount.toBase58()}`);

            const transaction = new Transaction();

            const fromTokenAccountInfo = await connection.getAccountInfo(fromTokenAccount);
            if (!fromTokenAccountInfo) {
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        user.publicKey,
                        fromTokenAccount,
                        user.publicKey,
                        mintAddress
                    )
                );
            }

            const toTokenAccountInfo = await connection.getAccountInfo(toTokenAccount);
            if (!toTokenAccountInfo) {
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        user.publicKey,
                        toTokenAccount,
                        recipientPublicKey,
                        mintAddress
                    )
                );
            }

            transaction.add(
                createTransferInstruction(
                    fromTokenAccount,
                    toTokenAccount,
                    user.publicKey,
                    1,
                    [],
                    TOKEN_PROGRAM_ID
                )
            );

            const signature = await connection.sendTransaction(transaction, [user], { skipPreflight: false, preflightCommitment: "finalized" });
            console.log(
                `Transaction Signature: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
            );
        } catch (error) {
            console.error(`Failed to transfer NFT to ${recipient}:`, error);
        }
    }
}

main()
    .then(() => {
        console.log("Finished successfully")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
