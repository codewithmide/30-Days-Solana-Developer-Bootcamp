import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

//establish connection to Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//dynamic address supplied
const supplied_address = (process.argv[2]);
console.log(`supplied public key:${supplied_address}`);



let public_key;

try {
  public_key = new PublicKey(supplied_address);
}
catch{
  console.log(`Invalid Public Key`);
  
}



const balance = await connection.getBalance(public_key); //gets balance from supplied address  
  const balance_in_sol = balance / LAMPORTS_PER_SOL; //balance conversion
  
console.log(`💰 Finished! The balance for the wallet at address ${public_key} is ${balance_in_sol} sol`);

//criteria for invalid wallet address
//instead of checking the address length run the connection if successful then address is valid

// const connected = await connection.getAccountInfoAndContext(supplied_address);//this makes sure the supplied address is valid
