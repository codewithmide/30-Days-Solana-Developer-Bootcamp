process.argv = [process.argv[0], ...process.argv.slice(3)];

		import __esrun_url from 'url';

		import { createRequire as __esrun_createRequire } from "module";

		const __esrun_fileUrl = __esrun_url.pathToFileURL("esrun-1716146495187.tmp.mjs");

		const require = __esrun_createRequire(__esrun_fileUrl);
// phil.ts
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "../node_modules/@solana/web3.js/lib/index.cjs.js";
(async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const addressString = "xrwPFQEZCqFwLjtQC8Xg2FPPaoAh6enjE8ZG6Gj7gr5";
  let address;
  try {
    address = new PublicKey(addressString);
  } catch (e) {
    console.error(`Invalid public key provided: ${addressString}`);
    process.exit(1);
  }
  try {
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
    console.log(`\u2705 Finished!`);
  } catch (error) {
    console.error(`Failed to fetch balance: ${error.message}`);
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhpbC50cyJdLAogICJzb3VyY2VSb290IjogIkM6XFxVc2Vyc1xccGhpbGlcXE9uZURyaXZlXFxEZXNrdG9wXFxQcm9qZWN0XFxGdWxsc3RhY2tcXDMwLURheXMtU29sYW5hLURldmVsb3Blci1Cb290Y2FtcFxcUmVhZGluZyIsCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBDb25uZWN0aW9uLCBQdWJsaWNLZXksIGNsdXN0ZXJBcGlVcmwsIExBTVBPUlRTX1BFUl9TT0wgfSBmcm9tIFwiQHNvbGFuYS93ZWIzLmpzXCI7XHJcblxyXG4oYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjbHVzdGVyQXBpVXJsKFwiZGV2bmV0XCIpKTtcclxuICBjb25zdCBhZGRyZXNzU3RyaW5nID0gJ3hyd1BGUUVaQ3FGd0xqdFFDOFhnMkZQUGFvQWg2ZW5qRThaRzZHajdncjUnO1xyXG4gIFxyXG4gIGxldCBhZGRyZXNzO1xyXG4gIHRyeSB7XHJcbiAgICBhZGRyZXNzID0gbmV3IFB1YmxpY0tleShhZGRyZXNzU3RyaW5nKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHB1YmxpYyBrZXkgcHJvdmlkZWQ6ICR7YWRkcmVzc1N0cmluZ31gKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBiYWxhbmNlID0gYXdhaXQgY29ubmVjdGlvbi5nZXRCYWxhbmNlKGFkZHJlc3MpO1xyXG4gICAgY29uc3QgYmFsYW5jZUluU29sID0gYmFsYW5jZSAvIExBTVBPUlRTX1BFUl9TT0w7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRoZSBiYWxhbmNlIG9mIHRoZSBhY2NvdW50IGF0ICR7YWRkcmVzc30gaXMgJHtiYWxhbmNlSW5Tb2x9IFNPTGApO1xyXG4gICAgY29uc29sZS5sb2coYFx1MjcwNSBGaW5pc2hlZCFgKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGZldGNoIGJhbGFuY2U6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICB9XHJcbn0pKCk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLFlBQVksV0FBVyxlQUFlLHdCQUF3QjtBQUFBLENBRXRFLFlBQVk7QUFDWCxRQUFNLGFBQWEsSUFBSSxXQUFXLGNBQWMsUUFBUSxDQUFDO0FBQ3pELFFBQU0sZ0JBQWdCO0FBRXRCLE1BQUk7QUFDSixNQUFJO0FBQ0YsY0FBVSxJQUFJLFVBQVUsYUFBYTtBQUFBLEVBQ3ZDLFNBQVMsR0FBUDtBQUNBLFlBQVEsTUFBTSxnQ0FBZ0MsZUFBZTtBQUM3RCxZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBRUEsTUFBSTtBQUNGLFVBQU0sVUFBVSxNQUFNLFdBQVcsV0FBVyxPQUFPO0FBQ25ELFVBQU0sZUFBZSxVQUFVO0FBRS9CLFlBQVEsSUFBSSxpQ0FBaUMsY0FBYyxrQkFBa0I7QUFDN0UsWUFBUSxJQUFJLGtCQUFhO0FBQUEsRUFDM0IsU0FBUyxPQUFQO0FBQ0EsWUFBUSxNQUFNLDRCQUE0QixNQUFNLFNBQVM7QUFBQSxFQUMzRDtBQUNGLEdBQUc7IiwKICAibmFtZXMiOiBbXQp9Cg==

	