import {Keypair} from '@solana/web3.js';
import * as fs from 'fs';

const walletFile = 'solana_wallet.json';
let keypair = Keypair;

if (fs.existsSync(walletFile)) {
	// **Load existing wallet**: read secret key from file and restore keypair
	const secretKeyBytes = JSON.parse(fs.readFileSync(walletFile, 'utf-8'));
	keypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyBytes));
	console.log(
		`Loaded Solana wallet from file. Public Key: ${keypair.publicKey.toBase58()}`
	);
} else {
	// **Generate new wallet**: create new keypair and save the secret key
	keypair = Keypair.generate();
	console.log('New Solana Wallet Created:');
	console.log('Public Key (Address):', keypair.publicKey.toBase58());
	console.log(
		'Secret Key (Private Key, 64 bytes) saved to file (DO NOT SHARE!)'
	);
	// Save secret key as array of numbers for later reuse
	fs.writeFileSync(walletFile, JSON.stringify(Array.from(keypair.secretKey)));

	// Fund the new wallet using a faucet (Devnet)
	console.log(
		'Please fund your new wallet with USDC and SOL using a Devnet faucet, e.g.:'
	);

	// USDC devnet faucet
	// https://faucet.circle.com/
	console.log('https://faucet.circle.com/');
}
