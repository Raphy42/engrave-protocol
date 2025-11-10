// @ts-check
/**
 * Inscription Routes (BETA)
 *
 * This module contains beta endpoints for creating Bitcoin Ordinals inscriptions.
 * All routes are available at /api/beta/inscribe and are actively being developed.
 *
 * BETA Status: These endpoints are functional but may change based on feedback.
 *
 * Features:
 * - Single inscription creation
 * - Batch inscription processing
 * - x402 payment-protected operations
 *
 * @beta All endpoints in this module are in beta and subject to change
 */
import express from 'express';
import {agentService} from '../services/agent.service.js';
import {x402Service} from '../services/x402.service.js';

const router = express.Router();

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @beta This endpoint is in beta and subject to change
 * @swagger
 * /api/beta/inscribe:
 *   get:
 *     tags:
 *       - Inscription (Beta)
 *     summary: "[BETA] Create Bitcoin Ordinals inscription"
 *     description: "🔐 Create a Bitcoin Ordinals inscription with x402 payment required. **Cost: $1.00 USDC**"
 *     security:
 *       - x402: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content to inscribe (text or data)
 *               contentType:
 *                 type: string
 *                 description: MIME type of the content
 *                 example: "text/plain"
 *               creator:
 *                 type: string
 *                 description: Bitcoin address of the inscription creator
 *     responses:
 *       '200':
 *         description: Inscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdinalInscription'
 *       '402':
 *         description: Payment required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentRequired'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * GET /api/inscribe
 * x402 payment-protected endpoint for Bitcoin Ordinals inscriptions
 */
/** @type {import('express').RequestHandler} */
const inscribeHandler = async (req, res) => {
	try {
		// Extract payment header from request
		const paymentHeader = x402Service.extractPayment(req.headers);

		console.log('[INSCRIBE] paymentHeader present?', !!paymentHeader);

		// Create payment requirements: $1.00 USDC
		const paymentRequirements = await x402Service.createPaymentRequirements(
			1000000, // $1.00 in USDC (6 decimals)
			'/api/inscribe',
			'Bitcoin Ordinals Inscription'
		);

		// If no payment header, return 402 Payment Required
		if (!paymentHeader) {
			const response = x402Service.create402Response(paymentRequirements);
			return res.status(response.status).json(response.body);
		}

		console.log('paymentRequirements', paymentRequirements);

		// Verify the payment
		const verified = await x402Service.verifyPayment(
			paymentHeader,
			paymentRequirements
		);

		console.log('verified', verified);

		if (!verified) {
			return res.status(402).json({
				error: 'Invalid payment',
				message: 'Payment verification failed',
			});
		}

		// Process the AI agent task (inscription)
		const result = await agentService.processInscriptionRequest(req.body);

		// Settle the payment
		await x402Service.settlePayment(paymentHeader, paymentRequirements);

		// Return success response
		return res.json(result);
	} catch (error) {
		console.error('Error handling inscribe endpoint:', error);
		return res.status(500).json({
			error: 'Internal server error',
			// @ts-ignore
			message: error.message,
		});
	}
};

router.get('/inscribe', inscribeHandler);

export default router;
