import { ChainId } from "../constants/networks";

export interface IToken {
    addressMap: {
        [chainId in ChainId]: string;
    };
    decimal: 6 | 8| 18;
    symbol: string;
}

export interface ITokenMap {
    [tokenName: string]: IToken;
}
