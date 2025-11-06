// TODO: Make a payment header with x402 to API with USDC on Solana testnet

// 1. Need to generate wallet 

  // const solanaWeb3 = require('@solana/web3.js');

  // async function createSolanaWallet() {
  //     // Generate a new keypair
  //     const keypair = solanaWeb3.Keypair.generate();

  //     // Extract public and private keys
  //     const publicKey = keypair.publicKey.toBase58();
  //     const secretKey = keypair.secretKey; // This is a Uint8Array

  //     console.log("New Solana Wallet Created:");
  //     console.log("Public Key (Address):", publicKey);
  //     console.log("Secret Key (Private Key - DO NOT SHARE):", secretKey);

  //     // You might want to store the secret key securely,
  //     // for example, in a file or encrypted storage.
  //     // For demonstration, we are just printing it.
  // }

  // createSolanaWallet();

// 2. Get USDC on sol testnet -> https://faucet.circle.com/

// 3. Make request with x402 payment header

https://github.com/coinbase/x402/tree/main/examples/typescript/clients/axios