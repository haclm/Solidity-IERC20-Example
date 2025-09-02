import assert from "node:assert/strict";
import { before, describe, it } from "node:test";

import { network } from "hardhat";

describe("Counter", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  let IERC20: any;
  let accounts: `0x${string}`[] = [];

  before( async () => {
    const walletClient = await viem.getWalletClients(); 
    accounts = walletClient.map((wc) => wc.account.address);

    IERC20 = await viem.deployContract("contracts/IERC20.sol:MyContract"
  ,[],{client:{wallet: walletClient[0] }});
  });


  it("IERC20 should be able to verify all variants values", async () => {
    const supply = await IERC20.read.totalSupply();
    assert.equal(supply, 10n * 10n ** 18n);
  });

  it("deployer should hava total supply balance", async () => {
    const balance = await IERC20.read.balanceOf([accounts[0]]);
    assert.equal(balance, 10n * 10n ** 18n);
  });

  it("transfer should work correctly", async () => {
    const amount = 1n * 10n ** 18n;
    await IERC20.write.transfer([accounts[1], amount], {accounts: accounts[0]});
    const balance0 = await IERC20.read.balanceOf([accounts[0]]),
      balance1 = await IERC20.read.balanceOf([accounts[1]]);
    assert.equal(balance0, 9n * 10n ** 18n);
    assert.equal(balance1, amount);
  });

 it("approve and allowacne should work", async () => { 
  const amount = 2n * 10n ** 18n;
  await IERC20.write.approve([accounts[1], amount], {accounts: accounts[0]});
  const allowance = await IERC20.read.allowance([accounts[0], accounts[1]]);
  assert.equal(allowance, amount);
 });

 it("transferFrom should work correctly", async () => {
  const amount = 1n * 10n ** 18n;

  await IERC20.write.approve([accounts[1], 2n * 10n **18n], {account: accounts[0]});
  await IERC20.write.transferFrom([accounts[0], accounts[2], amount], {account: accounts[1]});

  const balance0 = await IERC20.read.balanceOf([accounts[0]]),
    balance2 = await IERC20.read.balanceOf([accounts[2]]),
    allowance = await IERC20.read.allowance([accounts[0], accounts[1]]);

  assert.equal(balance0, 8n * 10n ** 18n);
  assert.equal(balance2, amount);
  assert.equal(allowance, 1n * 10n ** 18n);
 });
});
