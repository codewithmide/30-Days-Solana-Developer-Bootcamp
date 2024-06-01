import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

//const connection = new Connection(clusterApiUrl("mainnet-beta"));
const connection = new Connection(clusterApiUrl("devnet"));
try {
    // tol.sol public address
    //const address = new PublicKey('33aFRQKgH7YvaTQk5JkwnAb6B9cP3BwNneoP4iDGWT1r');
    const address = new PublicKey('AQqRG2rdvZGXYNN2qAbU3hbLeYEyhv1icSuQM2F16RA4');
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
    console.log(`✅ Finished`);
} catch (error) {
  console.log(`error: ${error.message}`)
}
