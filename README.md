# 🪶 Engrave Protocol

**The first open-source MCP Server that gives AI Agents multifaceted access to the Bitcoin Network via an x402 endpoint hosted on Solana.**

---

## 🧩 Overview

**Engrave Protocol** is an **MCP (Model Context Protocol) Server** designed to bridge the gap between **AI Agents** and the **Bitcoin settlement layer**.  
It enables agents operating on **Solana** to **transact, inscribe, and interact with Bitcoin** through standardized MCP endpoints — unlocking interoperability across the most secure and the most scalable blockchains.

---

## ❗ Problem Statement

Most agentic activity will occur on **Solana** or **Base** due to low fees and near-instant settlement.  
However, **Bitcoin remains the ultimate layer for data permanence and finality.**

There is currently **no unified, open-source infrastructure** that allows AI Agents to interact directly with Bitcoin’s base layer in a permissionless and composable way.

---

## ⚙️ Solution

Engrave Protocol functions as the **connective tissue** between **AI Agent ecosystems** and **Bitcoin’s on-chain settlement**, using:

- **x402 endpoints** for trust-minimized payments and requests
- **Solana MCP servers** for agent orchestration
- **Bitcoin Ordinals inscriptions** for data anchoring and identity proofs

Together, these components enable **AI Agents to inscribe, pay, and operate across layers** with minimal friction.

![Architecture Diagram](./architecture.png)

---

## 🎯 Goals

- 🧠 **Build in Public** — Transparent development and documentation
- 📺 **Daily Streams** — Share progress and experiments live
- 💾 **Open Source** — Continuous uploads to a public GitHub repository
- 🏆 **Hackathon Goal** — Win the official **Solana x402 Hackathon (MCP Track)**

Follow us on [Twitter](https://x.com/engraveprotocol)

---

## 🚀 Quick Start with MCP Clients

### Prerequisites
- Node.js 18+ installed
- MCP-compatible client (Claude Desktop, Cline, etc.)
- Solana wallet with USDC on Devnet

### 1. Install Dependencies

```bash
# Clone and install
git clone https://github.com/david-dacruz/engrave-protocol.git
cd engrave-protocol
npm run install:all
```

### 2. Start API Server

```bash
# Terminal 1: Start the API server
cd api
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Create MCP Server Wallet

```bash
# Terminal 2: Generate wallet for MCP server
cd api
npm run mcp:create-wallet

# Fund the wallet with USDC
# Visit: https://faucet.circle.com
```

### 4. Configure Your MCP Client

**For Claude Desktop**, edit your config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "engrave-protocol": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/engrave-protocol/api/src/mcp/server.js"],
      "env": {
        "TREASURY_WALLET_ADDRESS": "your_treasury_address",
        "BASE_API_URL": "http://localhost:3000",
        "MCP_WALLET_FILE": "/ABSOLUTE/PATH/TO/engrave-protocol/api/mcp_wallet.json",
        "X402_NETWORK": "solana-devnet"
      }
    }
  }
}
```

**Important**: Use absolute paths, not relative paths.

### 5. Restart MCP Client & Test

Restart Claude Desktop (or your MCP client) and try:

```
Create a Bitcoin Ordinals inscription with the text "Hello from AI"
```

The MCP server will automatically:
- Handle the x402 payment ($1.00 USDC)
- Create the Bitcoin inscription
- Return the inscription ID and transaction hash

### 📚 Full Setup Guide

For complete instructions, troubleshooting, and advanced configuration:

**[→ Read the Complete MCP Setup Guide](docs/MCP_SETUP.md)**

---

## 🔧 Available MCP Tools

| Tool | Description | Payment | Parameters |
|------|-------------|---------|------------|
| `inscribe_ordinal` | Create Bitcoin inscription | $1.00 USDC | content, content_type, destination_address |
| `get_inscription_status` | Check inscription status | Free | inscription_id |
| `list_inscriptions` | List inscriptions by address | Free | address |
| `generate_bitcoin_address` | Generate new Bitcoin address | Free | index (optional) |
| `validate_bitcoin_address` | Validate Bitcoin address | Free | address |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              MCP Client (Claude Desktop)                 │
│                     Natural Language                     │
└──────────────────────┬──────────────────────────────────┘
                       │ stdio (MCP Protocol)
                       ▼
┌─────────────────────────────────────────────────────────┐
│              MCP Server (Node.js)                        │
│  • Manages Solana wallet                                │
│  • Converts MCP calls → HTTP requests                   │
│  • Handles x402 payments automatically                  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP + x402 headers (USDC payment)
                       ▼
┌─────────────────────────────────────────────────────────┐
│              API Server (Express.js)                     │
│  • /api/inscribe (x402 protected)                       │
│  • Verifies payments                                    │
│  • Settles to treasury                                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│         Bitcoin Ordinals Inscription Service             │
│  • Creates inscription transaction                       │
│  • Broadcasts to Bitcoin network                        │
└─────────────────────────────────────────────────────────┘
```

**Key Innovation**: MCP server acts as a payment bridge, converting stdio-based MCP protocol to HTTP requests with x402 micropayments on Solana.

---

## 💡 Example Use Cases

### 1. Immortalize AI Conversations
```
Store this conversation permanently on Bitcoin as a text inscription
```

### 2. Create Provable Data Anchors
```
Create a Bitcoin inscription with this JSON data:
{"timestamp": "2024-11-10", "source": "Claude", "hash": "abc123"}
```

### 3. Generate Bitcoin Addresses
```
Generate 5 Bitcoin testnet addresses for our inscription project
```

### 4. Verify Inscription Status
```
Check the status of inscription ID abc123def456
```

---

## 📊 Cost Structure

| Operation | Network | Cost |
|-----------|---------|------|
| Bitcoin Inscription | Solana (x402) | $1.00 USDC |
| x402 Transaction | Solana | ~0.000005 SOL |
| Status Checks | Free | $0.00 |
| Address Generation | Free | $0.00 |

**Note**: Currently using Bitcoin testnet and Solana devnet for development.

---

## 🛠️ Development Scripts

```bash
# API Server
npm run dev              # Start API with hot reload
npm run start            # Start API in production mode

# MCP Server
npm run mcp:start        # Start MCP server
npm run mcp:dev          # Start MCP with hot reload
npm run mcp:inspect      # Test MCP server with inspector
npm run mcp:create-wallet # Generate new MCP wallet

# Testing
npm run test:basic       # Test Bitcoin integration
npm run test:endpoints   # Test all API endpoints
npm run test:app         # Test client application
```

---

## 📖 Documentation

- **[MCP Setup Guide](docs/MCP_SETUP.md)** - Complete MCP client configuration
- **[Payment Flow](docs/mcp-setup/PAYMENT_FLOW.md)** - How x402 payments work
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[Launch Summary](LAUNCH_SUMMARY.md)** - Deployment guide
- **[Setup Guide](SETUP.md)** - API server setup

---

## 🔐 Security Notes

- ⚠️ **Development Only**: Current configuration uses testnet/devnet
- 🔑 **Wallet Security**: Never commit wallet files to git
- 💰 **Limited Funds**: Keep minimal USDC in MCP wallet
- 🔒 **Environment Variables**: Use env vars for production secrets

---

## 🤝 Contributing

This project is part of the **Solana x402 Hackathon (MCP Track)**.

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🔗 Links

- **GitHub**: https://github.com/david-dacruz/engrave-protocol
- **Twitter**: https://x.com/engraveprotocol
- **x402 Docs**: https://docs.payai.network/x402
- **MCP Protocol**: https://modelcontextprotocol.io
- **USDC Faucet**: https://faucet.circle.com

---

**Built for the Solana x402 Hackathon** 🏆
