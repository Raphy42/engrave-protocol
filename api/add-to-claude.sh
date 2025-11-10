#!/bin/bash
TREASURY=$(grep "^TREASURY_WALLET_ADDRESS=" .env | cut -d'=' -f2)

cd /Users/rdantzer/work/web3/engrave-protocol

# Format: claude mcp add [options] <name> <commandOrUrl> [args...]
/Users/rdantzer/.claude/local/claude mcp add \
  --scope project \
  --transport stdio \
  -e "TREASURY_WALLET_ADDRESS=$TREASURY" \
  -e "BASE_API_URL=http://localhost:3000" \
  -e "MCP_WALLET_FILE=/Users/rdantzer/work/web3/engrave-protocol/api/mcp_wallet.json" \
  -e "X402_NETWORK=solana-devnet" \
  -e "BITCOIN_NETWORK=testnet" \
  -e "NODE_ENV=development" \
  engrave-protocol \
  node \
  /Users/rdantzer/work/web3/engrave-protocol/api/src/mcp/server.js
