import 'dotenv/config';
import express from 'express';
import {X402PaymentHandler} from 'x402-solana/server';

const {TREASURY_WALLET_ADDRESS, BASE_API_URL, PORT} = process.env;

// ENV VARIABLES

if (!TREASURY_WALLET_ADDRESS) {
	console.error('Missing TREASURY_WALLET_ADDRESS');
	process.exit(1);
}

if (!BASE_API_URL) {
	console.error('Missing TREASURY_WALLET_ADDRESS');
	process.exit(1);
}

// APP SETUP

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x402-Signature, x402-PublicKey'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST');

	// X402 PAYMENT HANDLER SETUP

	const x402 = new X402PaymentHandler({
		network: 'solana-devnet',
		treasuryAddress: TREASURY_WALLET_ADDRESS,
		facilitatorUrl: 'https://facilitator.paypai.network',
	});

	// API ENDPOINT
	app.get('/api/inscribe', async (req, res) => {
		try {
			const paymentHeader = x402.extractPayment(req.headers);

			const paymentRequirements = await x402.createPaymentRequirements({
				price: {
					amount: '1000000', // $1.00 USDC (6 decimal places)
					asset: {
						address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', // USDC devnet
					},
				},
				network: 'solana-devnet',
				config: {
					description: 'API Request',
					resource: `${BASE_API_URL}/api/inscribe`,
				},
			});

			if (!paymentHeader) {
				const response = x402.create402Response(paymentRequirements);
				return res.status(response.status).json(response.body);
			}

			const verified = await x402.verifyPayment(
				paymentHeader,
				paymentRequirements
			);
			if (!verified) {
				return res.status(402).json({error: 'Invalid payment'});
			}

			const result = await runAgentTask(req);
			await x402.settlePayment(paymentHeader, paymentRequirements);

			return res.json(result);
		} catch (error) {
			console.error('Error handling paid endpoint:', error);
			return res.status(500).json({error: 'Internal server error'});
		}
	});

	next();
});

async function runAgentTask() {
	// create business logic for AI agent task here
	return {
		success: true,
		message: 'Paid Endpoint accessed successfully!',
		requestBody: req.body,
	};
}

// START SERVER

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
