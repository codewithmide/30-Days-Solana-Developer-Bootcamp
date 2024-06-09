import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment } from "@solana-developers/helpers";
  
  const suppliedToPubkey = process.argv[2] || null;
  
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }
  
  let toPubkey;
  try {
    toPubkey = new PublicKey(suppliedToPubkey);
  } catch (e) {
    console.error(`Invalid public key provided: ${suppliedToPubkey}`);
    process.exit(1);
  }
  
  const senderKeypair = getKeypairFromEnvironment("SOLANA_SECRET_KEY");
  
  if (!senderKeypair) {
    console.error(`Failed to load sender's keypair from environment variable.`);
    process.exit(1);
  }
  
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );
  
  const transaction = new Transaction();
  const LAMPORTS_TO_SEND = 5000;
  
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
  
  transaction.add(sendSolInstruction);
  
  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);
  
    console.log(
      `💸 Finished! Sent ${LAMPORTS_TO_SEND} lamports to the address ${toPubkey}.`
    );
    console.log(`Transaction signature is ${signature}!`);
  } catch (error) {
    console.error(`Failed to send transaction: ${error.message}`);
  }
  