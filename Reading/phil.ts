import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const addressString = 'xrwPFQEZCqFwLjtQC8Xg2FPPaoAh6enjE8ZG6Gj7gr5';
  
  let address;
  try {
    address = new PublicKey(addressString);
    if (!PublicKey.isOnCurve(address.toBuffer())) {
      throw new Error('The public key is off-curve, which indicates it is not a valid standard address.');
    }
  } catch (e) {
    console.error(`Invalid public key provided: ${addressString}`);
    console.error(e.message);
    process.exit(1);
  }

  try {
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
    console.log(`✅ Finished!`);
  } catch (error) {
    console.error(`Failed to fetch balance: ${error.message}`);
  }
})();
