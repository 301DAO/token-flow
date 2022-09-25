// import { parseUnits, formatUnits } from 'ethers';

import { BigNumber } from 'ethers';
import { formatUnits, parseEther, parseUnits } from 'ethers/lib/utils';

export function parseBigNumberToString(decimal: number, bigNumber: BigNumber) {
  return formatUnits(bigNumber, decimal);
}

export function parseUnitByDecimal(decimal: 6 | 8 | 18, number: number) {
  switch (decimal) {
    case 6:
      return parseUnits(number.toFixed(decimal).toString(), 'mwei');
    case 8:
      // no native eth unit handles 8 decimal
      return parseUnits((number * 10).toFixed(decimal).toString(), 'gwei');
    case 18:
      return parseEther(number.toFixed(18).toString());
  }
}
