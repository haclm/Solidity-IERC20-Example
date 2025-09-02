# Solidity-IERC20-Example

A simple ERC20 token smart contract implementation in Solidity, tested with TypeScript using Viem and Hardhat.

## Features

- ERC20 standard functions implemented: `totalSupply`, `balanceOf`, `transfer`, `approve`, `allowance`, `transferFrom`
- Fully tested with TypeScript + Viem
- Demonstrates deploying contracts, interacting with functions, and testing ERC20 behavior
- Includes examples for `approve` and `transferFrom` patterns

## Tech Stack

- Solidity ^0.8.0
- TypeScript
- Hardhat (local Ethereum test network)
- Viem (contract interaction library)
- Node.js & npm

## Installation

```bash
npm install && npx hardhat test
