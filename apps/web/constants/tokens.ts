import { ITokenMap } from "../models/token";
import { ChainId } from "./networks";

export const TOKENS: ITokenMap = {
    WETH: {
        addressMap: {
            [ChainId.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            [ChainId.Goerli]: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
        },
        decimal: 18,
        symbol: 'WETH'
    },
    WBTC: {
        addressMap: {
            [ChainId.Mainnet]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            [ChainId.Goerli]: '0xc04b0d3107736c32e19f1c62b2af67be61d63a05'
        },
        decimal: 8,
        symbol: 'WBTC'
    },
    AAVE: {
        addressMap: {
            [ChainId.Mainnet]: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
            [ChainId.Goerli]: '0x63242b9bd3c22f18706d5c4e627b4735973f1f07',
        },
        decimal: 18,
        symbol: 'AAVE'
    },
    USDC: {
        addressMap: {
            [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            [ChainId.Goerli]: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557'
        },
        decimal: 6,
        symbol: 'USDC'
    },
    USDT: {
        addressMap: {
            [ChainId.Mainnet]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            [ChainId.Goerli]: '0x509ee0d083ddf8ac028f2a56731412edd63223b9'
        },
        decimal: 6,
        symbol: 'USDT'
    }
}
