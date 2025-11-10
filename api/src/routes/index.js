// @ts-check
import express from 'express';
import inscribeRoutes from './inscribe.routes.js';
import ordinalsRoutes from './ordinals.routes.js';
import bitcoinRoutes from './bitcoin.routes.js';
import mempoolRoutes from './mempool.routes.js';

const router = express.Router();

/**
 * Root API routes with versioning
 *
 * API Structure:
 * - /api/v1/mempool/* - Production-ready mempool endpoints
 * - /api/beta/inscribe - Beta inscription endpoints
 * - /api/beta/ordinals/* - Beta ordinals endpoints
 * - /api/beta/bitcoin/* - Beta bitcoin endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: API health check
 *     description: Check the health and status of the Engrave Protocol API. Shows endpoint versioning with v1 (production) and beta endpoints.
 *     responses:
 *       '200':
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get('/health', (req, res) => {
	res.json({
		status: 'healthy',
		service: 'Engrave Protocol MCP Server',
		timestamp: new Date().toISOString(),
		version: '1.0.0',
		features: {
			bitcoinWallet: true,
			ordinalsInscription: true,
			mempoolBridge: true,
			mcpServer: true,
			x402Payments: true,
		},
		endpoints: {
			v1: {
				mempool: '/api/v1/mempool/*',
			},
			beta: {
				inscription: '/api/beta/inscribe',
				ordinals: '/api/beta/ordinals/*',
				bitcoin: '/api/beta/bitcoin/*',
			},
			utility: {
				health: '/health',
				apiDocs: '/api-docs',
				apiDocsJson: '/api-docs.json',
			},
		},
	});
});

// Mount v1 production routes
// Mempool routes (production-ready)
router.use('/api/v1/mempool', mempoolRoutes);

// Mount beta routes
// Inscription routes (beta)
router.use('/api/beta', inscribeRoutes);

// Ordinals routes (beta)
router.use('/api/beta/ordinals', ordinalsRoutes);

// Bitcoin routes (beta)
router.use('/api/beta/bitcoin', bitcoinRoutes);

export default router;
