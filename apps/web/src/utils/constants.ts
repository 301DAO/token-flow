export const NETWORK_NAME_TO_CHAIN_ID = {
  1: 'mainnet',
  3: 'ropsten',
  42: 'kovan',
  56: 'bsc',
  4: 'rinkeby',
  5: 'goerli',
};

export interface IToken {
  address: string;
  decimal: 6 | 8 | 18;
  symbol: string;
}

export interface ITokenMap {
  [tokenName: string]: IToken;
}

export const Token: ITokenMap = {
  SUSHI: {
    address: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
    decimal: 18,
    symbol: 'SUSHI',
  },
  AAVE: {
    address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    decimal: 18,
    symbol: 'SUSHI',
  },
  WETH: {
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    decimal: 18,
    symbol: 'WETH',
  },
  TITAN: {
    address: '0xaaa5b9e6c589642f98a1cda99b9d024b8407285a',
    decimal: 18,
    symbol: 'TITAN',
  },
  WMATIC: {
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    decimal: 18,
    symbol: 'WMATIC',
  },
  USDC: {
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimal: 6,
    symbol: 'USDC',
  },
  USDT: {
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimal: 6,
    symbol: 'USDT',
  },
  SALE: {
    address: '0x8f6196901a4a153d8ee8f3fa779a042f6092d908',
    decimal: 18,
    symbol: 'SALE',
  },
  WBTC: {
    address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    decimal: 8,
    symbol: 'WBTC',
  },
  LINK: {
    address: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
    decimal: 18,
    symbol: 'LINK',
  },
  WOO: {
    address: '0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
    decimal: 18,
    symbol: 'WOO',
  },
};
