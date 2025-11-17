// @ts-check
/**
 * OpenAPI Route Registrations for Mempool Endpoints
 *
 * This file contains all OpenAPI/Swagger documentation for mempool routes.
 * Routes are auto-generated from Zod schemas.
 */

import { registerRoute } from '../config/openapi.js';
import {
	// Parameter schemas
	AddressParamSchema,
	TxidParamSchema,
	BlockHashParamSchema,
	BlockHeightParamSchema,
	IntervalParamSchema,

	// Response schemas
	AddressInfoResponseSchema,
	AddressTransactionsResponseSchema,
	TransactionResponseSchema,
	TransactionStatusResponseSchema,
	BlockResponseSchema,
	FeesResponseSchema,
	FeesWithIntervalResponseSchema,
	MempoolStatsResponseSchema,
	BlockHeightResponseSchema,
	AddressUtxoResponseSchema,
	AddressMempoolTxsResponseSchema,
	TransactionHexResponseSchema,
	TransactionOutspendsResponseSchema,
	BlockTransactionsResponseSchema,
	BlockByHeightResponseSchema,
	MempoolBlocksResponseSchema,
} from '../schemas/mempool.schemas.js';

/**
 * Register all mempool endpoint routes in OpenAPI
 * Call this function to populate the OpenAPI spec with all endpoint documentation
 */
export function registerMempoolRoutes() {
	// ========================================
	// Phase 1: Core Endpoints
	// ========================================

	// GET /api/v1/mempool/address/:address
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/address/{address}',
		summary: 'Get Bitcoin address information',
		description: '🔐 Retrieve detailed information about a Bitcoin address including balance and transaction history. **Cost: $0.10 USDC**',
		tags: ['Address Analytics'],
		requiresPayment: true,
		request: {
			params: AddressParamSchema,
		},
		responses: {
			success: {
				description: 'Address information retrieved successfully',
				schema: AddressInfoResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/address/:address/txs
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/address/{address}/txs',
		summary: 'Get address transactions',
		description: '🔐 Retrieve all transactions for a Bitcoin address. **Cost: $0.25 USDC**',
		tags: ['Address Analytics'],
		requiresPayment: true,
		request: {
			params: AddressParamSchema,
		},
		responses: {
			success: {
				description: 'Transactions retrieved successfully',
				schema: AddressTransactionsResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/tx/:txid
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/tx/{txid}',
		summary: 'Get transaction details',
		description: '🔐 Retrieve detailed information about a specific Bitcoin transaction. **Cost: $0.10 USDC**',
		tags: ['Transactions'],
		requiresPayment: true,
		request: {
			params: TxidParamSchema,
		},
		responses: {
			success: {
				description: 'Transaction details retrieved successfully',
				schema: TransactionResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/tx/:txid/status
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/tx/{txid}/status',
		summary: 'Get transaction confirmation status',
		description: '🔐 Check the confirmation status of a Bitcoin transaction. **Cost: $0.05 USDC**',
		tags: ['Transactions'],
		requiresPayment: true,
		request: {
			params: TxidParamSchema,
		},
		responses: {
			success: {
				description: 'Transaction status retrieved successfully',
				schema: TransactionStatusResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/block/:hash
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/block/{hash}',
		summary: 'Get block information',
		description: '🔐 Retrieve detailed information about a Bitcoin block. **Cost: $0.10 USDC**',
		tags: ['Blocks'],
		requiresPayment: true,
		request: {
			params: BlockHashParamSchema,
		},
		responses: {
			success: {
				description: 'Block information retrieved successfully',
				schema: BlockResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/fees
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/fees',
		summary: 'Get recommended Bitcoin fee rates',
		description: '🔐 Get current Bitcoin network fee recommendations for different confirmation speeds. **Cost: $0.01 USDC** (micropayment)',
		tags: ['Fees & Mempool'],
		requiresPayment: true,
		responses: {
			success: {
				description: 'Fee rates retrieved successfully',
				schema: FeesResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/fees/:interval
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/fees/{interval}',
		summary: 'Get recommended Bitcoin fee rates (with interval)',
		description: '🔐 Get current Bitcoin network fee recommendations. Interval parameter accepted for API compatibility. **Cost: $0.01 USDC** (micropayment)',
		tags: ['Fees & Mempool'],
		requiresPayment: true,
		request: {
			params: IntervalParamSchema,
		},
		responses: {
			success: {
				description: 'Fee rates retrieved successfully',
				schema: FeesWithIntervalResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/stats
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/stats',
		summary: 'Get mempool statistics',
		description: '🔐 Get current Bitcoin mempool statistics including size, fees, and transaction counts. **Cost: $0.01 USDC** (micropayment)',
		tags: ['Fees & Mempool'],
		requiresPayment: true,
		responses: {
			success: {
				description: 'Mempool statistics retrieved successfully',
				schema: MempoolStatsResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/height
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/height',
		summary: 'Get current Bitcoin block height',
		description: 'Get the current Bitcoin block height. **FREE - No payment required**',
		tags: ['Blocks'],
		requiresPayment: false,
		responses: {
			success: {
				description: 'Block height retrieved successfully',
				schema: BlockHeightResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/address/:address/utxo
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/address/{address}/utxo',
		summary: 'Get address UTXOs',
		description: '🔐 Retrieve unspent transaction outputs for a Bitcoin address. **Cost: $0.05 USDC**',
		tags: ['Address Analytics'],
		requiresPayment: true,
		request: {
			params: AddressParamSchema,
		},
		responses: {
			success: {
				description: 'UTXOs retrieved successfully',
				schema: AddressUtxoResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/address/:address/txs/mempool
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/address/{address}/txs/mempool',
		summary: 'Get unconfirmed address transactions',
		description: '🔐 Retrieve unconfirmed transactions for a Bitcoin address. **Cost: $0.02 USDC** (micropayment)',
		tags: ['Address Analytics'],
		requiresPayment: true,
		request: {
			params: AddressParamSchema,
		},
		responses: {
			success: {
				description: 'Mempool transactions retrieved successfully',
				schema: AddressMempoolTxsResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/tx/:txid/hex
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/tx/{txid}/hex',
		summary: 'Get raw transaction hex',
		description: '🔐 Retrieve raw transaction data in hex format. **Cost: $0.03 USDC**',
		tags: ['Transactions'],
		requiresPayment: true,
		request: {
			params: TxidParamSchema,
		},
		responses: {
			success: {
				description: 'Transaction hex retrieved successfully',
				schema: TransactionHexResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/tx/:txid/outspends
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/tx/{txid}/outspends',
		summary: 'Get transaction output spend status',
		description: '🔐 Check if transaction outputs have been spent. **Cost: $0.05 USDC**',
		tags: ['Transactions'],
		requiresPayment: true,
		request: {
			params: TxidParamSchema,
		},
		responses: {
			success: {
				description: 'Output spend status retrieved successfully',
				schema: TransactionOutspendsResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/block/:hash/txs
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/block/{hash}/txs',
		summary: 'Get block transactions',
		description: '🔐 Retrieve all transactions in a block. **Cost: $0.15 USDC**',
		tags: ['Blocks'],
		requiresPayment: true,
		request: {
			params: BlockHashParamSchema,
		},
		responses: {
			success: {
				description: 'Block transactions retrieved successfully',
				schema: BlockTransactionsResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/block-height/:height
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/block-height/{height}',
		summary: 'Get block by height',
		description: '🔐 Retrieve block information by block height. **Cost: $0.05 USDC**',
		tags: ['Blocks'],
		requiresPayment: true,
		request: {
			params: BlockHeightParamSchema,
		},
		responses: {
			success: {
				description: 'Block retrieved successfully',
				schema: BlockByHeightResponseSchema,
			},
		},
	});

	// GET /api/v1/mempool/fees/mempool-blocks
	registerRoute({
		method: 'get',
		path: '/api/v1/mempool/fees/mempool-blocks',
		summary: 'Get projected mempool blocks',
		description: '🔐 Get projected mempool blocks with fee information. **Cost: $0.02 USDC** (micropayment)',
		tags: ['Fees & Mempool'],
		requiresPayment: true,
		responses: {
			success: {
				description: 'Mempool blocks retrieved successfully',
				schema: MempoolBlocksResponseSchema,
			},
		},
	});

	console.log('[OpenAPI] Registered 16 Phase 1 mempool endpoints');
}
