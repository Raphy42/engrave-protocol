// @ts-check
/**
 * Ordinals Routes (BETA)
 *
 * This module contains beta endpoints for querying and managing Bitcoin Ordinals inscriptions.
 * All routes are available at /api/beta/ordinals/* and are actively being developed.
 *
 * BETA Status: These endpoints are functional but may change based on feedback.
 *
 * Features:
 * - Get inscription details by ID
 * - List inscriptions by Bitcoin address
 * - Batch inscription creation
 * - Ordinals statistics
 *
 * @beta All endpoints in this module are in beta and subject to change
 */
import express from 'express';
import { agentService } from '../services/agent.service.js';
import { bitcoinService } from '../services/bitcoin.service.js';
import { x402Service } from '../services/x402.service.js';

const router = express.Router();

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @beta This endpoint is in beta and subject to change
 * @swagger
 * /api/beta/ordinals/{id}:
 *   get:
 *     tags:
 *       - Ordinals (Beta)
 *     summary: "[BETA] Get inscription details by ID"
 *     description: "[BETA] Retrieve detailed information about a specific Bitcoin Ordinals inscription"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Inscription ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Inscription details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 inscription:
 *                   type: object
 *       '400':
 *         description: Invalid inscription ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * GET /api/ordinals/:id
 * Get inscription details by ID
 */
/** @type {import('express').RequestHandler} */
const getInscriptionHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Inscription ID is required',
            });
        }

        const inscription = await agentService.getInscriptionStatus(id);
        
        return res.json({
            success: true,
            inscription,
        });
    } catch (error) {
        console.error('Error getting inscription:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

/**
 * @beta This endpoint is in beta and subject to change
 * @swagger
 * /api/beta/ordinals/address/{address}:
 *   get:
 *     tags:
 *       - Ordinals (Beta)
 *     summary: "[BETA] List inscriptions by Bitcoin address"
 *     description: "[BETA] Retrieve all Bitcoin Ordinals inscriptions owned by a Bitcoin address"
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         description: Bitcoin address to query inscriptions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Inscriptions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 address:
 *                   type: string
 *                 inscriptions:
 *                   type: array
 *                   items:
 *                     type: object
 *                 count:
 *                   type: integer
 *       '400':
 *         description: Invalid Bitcoin address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * GET /api/ordinals/address/:address
 * List inscriptions by Bitcoin address
 */
/** @type {import('express').RequestHandler} */
const listInscriptionsByAddressHandler = async (req, res) => {
    try {
        const { address } = req.params;
        
        if (!address) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Bitcoin address is required',
            });
        }

        // Validate Bitcoin address
        if (!bitcoinService.validateAddress(address)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Invalid Bitcoin address',
            });
        }

        const inscriptions = await agentService.listInscriptionsByAddress(address);
        
        return res.json({
            success: true,
            address,
            inscriptions,
            count: inscriptions.length,
        });
    } catch (error) {
        console.error('Error listing inscriptions:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

/**
 * @beta This endpoint is in beta and subject to change
 * @swagger
 * /api/beta/ordinals/batch:
 *   post:
 *     tags:
 *       - Ordinals (Beta)
 *     summary: "[BETA] Create batch Bitcoin Ordinals inscriptions"
 *     description: "[BETA] 🔐 Create multiple Bitcoin Ordinals inscriptions in a single transaction with x402 payment required. **Cost: $1.00 USDC per inscription (max 10 per batch)**"
 *     security:
 *       - x402: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inscriptions
 *             properties:
 *               inscriptions:
 *                 type: array
 *                 maxItems: 10
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: Content to inscribe
 *                     contentType:
 *                       type: string
 *                       description: MIME type of the content
 *                     creator:
 *                       type: string
 *                       description: Bitcoin address of the inscription creator
 *     responses:
 *       '200':
 *         description: Batch inscriptions created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                 errors:
 *                   type: array
 *                 totalProcessed:
 *                   type: integer
 *                 successCount:
 *                   type: integer
 *                 errorCount:
 *                   type: integer
 *       '400':
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 * POST /api/ordinals/batch
 * x402 payment-protected endpoint for batch Bitcoin Ordinals inscriptions
 */
/** @type {import('express').RequestHandler} */
const batchInscribeHandler = async (req, res) => {
    try {
        const { inscriptions } = req.body;
        
        if (!inscriptions || !Array.isArray(inscriptions) || inscriptions.length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Inscriptions array is required and must not be empty',
            });
        }

        if (inscriptions.length > 10) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Maximum 10 inscriptions per batch',
            });
        }

        // Extract payment header from request
        const paymentHeader = x402Service.extractPayment(req.headers);

        console.log('[BATCH_INSCRIBE] paymentHeader present?', !!paymentHeader);

        // Create payment requirements: $1.00 USDC per inscription
        const totalPrice = inscriptions.length * 1000000; // $1.00 per inscription in USDC (6 decimals)
        const paymentRequirements = await x402Service.createPaymentRequirements(
            totalPrice,
            '/api/ordinals/batch',
            `Batch Bitcoin Ordinals Inscription (${inscriptions.length} inscriptions)`
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

        // Process batch inscriptions
        const results = [];
        const errors = [];

        for (let i = 0; i < inscriptions.length; i++) {
            try {
                const inscription = inscriptions[i];
                const result = await agentService.processInscriptionRequest(inscription);
                results.push({
                    index: i,
                    success: result.success,
                    message: result.message,
                    inscription: result.inscription,
                });
            } catch (error) {
                errors.push({
                    index: i,
                    error: error.message,
                });
            }
        }

        // Settle the payment
        await x402Service.settlePayment(paymentHeader, paymentRequirements);

        // Return batch results
        return res.json({
            success: true,
            message: `Batch inscription completed: ${results.filter(r => r.success).length}/${inscriptions.length} successful`,
            results,
            errors,
            totalProcessed: inscriptions.length,
            successCount: results.filter(r => r.success).length,
            errorCount: errors.length,
        });
    } catch (error) {
        console.error('Error handling batch inscribe endpoint:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
        });
    }
};

/**
 * @beta This endpoint is in beta and subject to change
 * @swagger
 * /api/beta/ordinals/stats:
 *   get:
 *     tags:
 *       - Ordinals (Beta)
 *     summary: "[BETA] Get ordinals statistics"
 *     description: "[BETA] Get statistics about Bitcoin Ordinals and supported content types. **FREE - No payment required**"
 *     responses:
 *       '200':
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalInscriptions:
 *                       type: integer
 *                     totalSize:
 *                       type: integer
 *                     averageSize:
 *                       type: integer
 *                     supportedContentTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     maxInscriptionSize:
 *                       type: integer
 *                     network:
 *                       type: string
 *                     pricing:
 *                       type: object
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * GET /api/ordinals/stats
 * Get general statistics about inscriptions (free endpoint)
 */
/** @type {import('express').RequestHandler} */
const getStatsHandler = async (req, res) => {
    try {
        // Mock statistics for now
        const stats = {
            totalInscriptions: 0,
            totalSize: 0,
            averageSize: 0,
            supportedContentTypes: [
                'text/plain',
                'text/html',
                'text/css',
                'text/javascript',
                'application/json',
                'image/png',
                'image/jpeg',
                'image/gif',
                'image/svg+xml',
                'image/webp'
            ],
            maxInscriptionSize: 400 * 1024, // 400KB
            network: bitcoinService.getNetworkInfo().network,
            pricing: {
                singleInscription: '$1.00 USDC',
                batchInscription: '$1.00 USDC per inscription',
                currency: 'USDC',
                network: 'Solana Devnet',
            },
        };
        
        return res.json({
            success: true,
            stats,
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

// Mount routes
router.get('/stats', getStatsHandler);
router.get('/:id', getInscriptionHandler);
router.get('/address/:address', listInscriptionsByAddressHandler);
router.post('/batch', batchInscribeHandler);

export default router;