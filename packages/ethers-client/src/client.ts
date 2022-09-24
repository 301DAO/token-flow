import { NonceManager } from '@ethersproject/experimental/lib/nonce-manager';
import { ethers } from 'ethers';
import erc20Abi from './abi/erc20.json';
import executionAbi from './abi/execution.json';
import { MoneyStrategy } from './action-model';

type transferActionParams = {
  token: string;
  to: string;
  amount: ethers.BigNumber;
  originationAddress: string;
};

type aaveDepositActionParams = {
  token: string;
  amount: ethers.BigNumber;
  destinationAddress: string;
  originationAddress: string;
};

type swapAction = {
  originationAddress: string;
  tokenIn: string;
  tokenOut: string;
  fee: ethers.BigNumber;
  destinationAddress: string;
  amountIn: ethers.BigNumber;
};

export class Client {
  private readonly _provider: ethers.providers.JsonRpcProvider;
  private readonly _listenedTokenAddress: string;
  private readonly _executionAddress: string;
  private readonly _tokenContract: ethers.Contract;
  private readonly _executionContract: ethers.Contract;
  private readonly _executionWallet: ethers.Wallet;

  constructor() {
    if (
      !process.env.RPC_URL ||
      !process.env.LISTENED_TOKEN_ADDRESS ||
      !process.env.EXECUTION_CONTRACT_ADDRESS ||
      !process.env.EXECUTION_PRIVATE_KEY
    ) {
      throw new Error('Missing environment variables');
    }
    this._provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    this._executionWallet = new ethers.Wallet(process.env.EXECUTION_PRIVATE_KEY, this._provider);
    this._listenedTokenAddress = process.env.LISTENED_TOKEN_ADDRESS;
    this._executionAddress = process.env.EXECUTION_CONTRACT_ADDRESS;
    this._tokenContract = new ethers.Contract(this._listenedTokenAddress, erc20Abi, this._provider);
    this._executionContract = new ethers.Contract(
      this._executionAddress,
      executionAbi,
      new NonceManager(this._executionWallet)
    );
  }

  public latestBlock = (): Promise<number> => {
    return this._provider.getBlockNumber();
  };

  public getExecutionOwner = async (): Promise<string> => {
    return this._executionContract.owner();
  };

  public getBalanceOf = async (address: string): Promise<ethers.BigNumber> => {
    return this._tokenContract.balanceOf(address);
  };

  public listenForTransfer = (
    callback: (from: string, to: string, amount: ethers.BigNumber) => void
  ) => {
    this._tokenContract.on('Transfer', callback);
  };

  public executeTokenTransfer = async (
    strategy: MoneyStrategy,
    amount: number
  ): Promise<ethers.providers.TransactionResponse> => {
    const { tokenInAddress, originationAddress, destinationAddress } = strategy;
    const params: transferActionParams = {
      token: tokenInAddress,
      to: destinationAddress,
      amount: ethers.BigNumber.from(amount),
      originationAddress,
    };
    try {
      return await this._executionContract.transferToken(
        params.token,
        params.to,
        params.amount,
        params.originationAddress
      );
    } catch (e) {
      throw new Error(`Error executing token transfer: ${e}`);
    }
  };

  public executeAaveDeposit = async (
    strategy: MoneyStrategy,
    amount: number
  ): Promise<ethers.providers.TransactionResponse> => {
    const { tokenInAddress, originationAddress, destinationAddress } = strategy;
    const params: aaveDepositActionParams = {
      token: tokenInAddress,
      amount: ethers.BigNumber.from(amount),
      destinationAddress,
      originationAddress,
    };
    try {
      return await this._executionContract.depositAaveV3(
        params.token,
        params.amount,
        params.destinationAddress,
        params.originationAddress
      );
    } catch (e) {
      throw new Error(`Error executing aave deposit: ${e}`);
    }
  };

  public executeSwap = async (
    strategy: MoneyStrategy,
    amount: number
  ): Promise<ethers.providers.TransactionResponse> => {
    const { tokenInAddress, tokenOutAddress, originationAddress, destinationAddress } = strategy;
    if (!tokenOutAddress) {
      throw new Error('Missing output token address');
    }
    const params: swapAction = {
      originationAddress,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      fee: ethers.BigNumber.from(500),
      destinationAddress,
      amountIn: ethers.BigNumber.from(amount),
    };
    try {
      return await this._executionContract.exactInputSingle(
        params.originationAddress,
        params.tokenIn,
        params.tokenOut,
        params.fee,
        params.destinationAddress,
        params.amountIn
      );
    } catch (e) {
      throw new Error(`Error executing swap: ${e}`);
    }
  };
}
