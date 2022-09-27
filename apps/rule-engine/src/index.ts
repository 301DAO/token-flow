import { Client } from 'ethers-client';
import { MoneyStrategy, MoneyStrategyType } from 'internal-common';
import { ddb } from 'database';
import { IRule } from 'database';
import { ethers } from 'ethers';

const client = new Client();

let data = null;

const DB_REFRESH_INTERVAL = 1000 * 60; // 1 minute

// pull db everytime we get a new block
// check if any rules get triggered in the latest block
// if so, execute the actions based on the rule

const exampleTransferStrategy: MoneyStrategy = {
  actionType: MoneyStrategyType.TRANSFER_TO_ADDRESS,
  originationAddress: '0xDa2A186755c05D4367Bba77a2e763D31936698b4',
  destinationAddress: '0x44630Fbe483b8Ee327f6b139033E6a68d38d4A82',
  tokenInAddress: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
};

const exampleAaveDepositStrategy: MoneyStrategy = {
  actionType: MoneyStrategyType.DEPOSIT_TO_AAVE,
  originationAddress: '0xDa2A186755c05D4367Bba77a2e763D31936698b4',
  destinationAddress: '0x44630Fbe483b8Ee327f6b139033E6a68d38d4A82',
  tokenInAddress: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
};

const exampleSwapStrategy: MoneyStrategy = {
  actionType: MoneyStrategyType.SWAP_ON_UNISWAP,
  originationAddress: '0xDa2A186755c05D4367Bba77a2e763D31936698b4',
  destinationAddress: '0x44630Fbe483b8Ee327f6b139033E6a68d38d4A82',
  tokenInAddress: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
  tokenOutAddress: '0x63242B9Bd3C22f18706d5c4E627B4735973f1f07',
};

const watchingAddress = '0xDa2A186755c05D4367Bba77a2e763D31936698b4';

const refreshDB = async () => {
  const rules = await ddb.rule.getAllRules();
  data = rules;
};

(async () => {
  const client = new Client();
  client.subscribeToBlocks((provider) => async (block) => {
    await refreshDB();

    // check if any rules get triggered in the latest block
    // await provider.subscribeToErc20Transfers();
    const allTransactionsInBlock = await provider.getBlockWithTransactions(block);
    console.log(allTransactionsInBlock);

    // execute the actions based on the rules
  });
})();

// const main = async () => {
//   const block = await client.latestBlock();
//   console.log(block);
//   const owner = await client.getExecutionOwner();
//   console.log(owner);
//   const balance = await client.getBalanceOf('0x34094f3B3969597eaCb67157D44c3094dDceFBaE');
//   console.log(balance.toString());

//   client.listenForTransfer(async (from, to, amount) => {
//     console.log(`Transfer from ${from} to ${to} of ${amount.toString()}`);
//     if (to === watchingAddress) {
//       await demoActions();
//     }
//   });
// };

// const demoActions = async () => {
//   console.log('demoActions');
//   const actions = [exampleTransferStrategy, exampleAaveDepositStrategy, exampleSwapStrategy];
//   // go through actions and execute them
//   for (const action of actions) {
//     let tx;
//     switch (action.actionType) {
//       case MoneyStrategyType.TRANSFER_TO_ADDRESS:
//         tx = await client.executeTokenTransfer(action, 2000000);
//         break;
//       case MoneyStrategyType.DEPOSIT_TO_AAVE:
//         tx = await client.executeAaveDeposit(action, 2000000);
//         break;
//       case MoneyStrategyType.SWAP_ON_UNISWAP:
//         tx = await client.executeSwap(action, 2000000);
//         break;
//       default:
//         console.log('Unknown action type');
//     }
//     if (!tx) continue;

//     console.log(`Submitted tx ${tx.hash}`);
//     const result = await tx.wait();
//     console.log(
//       `Tx ${tx.hash} confirmed in block ${result.blockNumber} with status ${result.status}`
//     );
//     if (result.status === 0) {
//       throw new Error(`Tx ${tx.hash} reverted`);
//     }
//   }
// };

// main();
// export {};
