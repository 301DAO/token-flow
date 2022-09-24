export const shortenString = (str: string, length: number = 4) => {
    return (
        str.slice(0, length) +
        '...' +
        str.slice(str.length - length, str.length)
    );
};

export const shortenBalance = (balance: string, length: number = 4) => {
    return balance.slice(0, length) + '...';
};
