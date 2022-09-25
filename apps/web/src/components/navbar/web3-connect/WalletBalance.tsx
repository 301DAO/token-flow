import * as React from 'react';

// import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { shortenBalance, shortenString } from '../../../utils/string-manipulation';

function WalletBalance() {
  // const { account, library, chainId } = useWeb3React();
  // const [balance, setBalance] = React.useState();
  // React.useEffect((): any => {
  //   if (!!account && !!library) {
  //     let stale = false;
  //     library
  //       .getBalance(account)
  //       .then((balance: any) => {
  //         if (!stale) {
  //           setBalance(balance);
  //         }
  //       })
  //       .catch(() => {
  //         if (!stale) {
  //           setBalance(undefined);
  //         }
  //       });
  //     return () => {
  //       stale = true;
  //       setBalance(undefined);
  //     };
  //   }
  // }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds
  // if (!!account && !!library) {
  //   return (
  //     <div className="flex flex-row rounded-lg bg-white border-white mr-8 items-center">
  //       <span className="px-2">
  //         {balance === null
  //           ? 'Error'
  //           : balance
  //           ? `Ξ${shortenBalance(formatEther(balance), 6)}`
  //           : ''}
  //       </span>
  //       <span className="bg-primary-alt rounded-lg p-1.5 px-2">{shortenString(account)}</span>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="flex flex-row rounded-lg bg-white border-white mr-8 items-center">
  //       <span className="px-2">...</span>
  //       <span className="bg-primary-alt rounded-lg p-1.5 px-2">0x...</span>
  //     </div>
  //   );
  // }
}

export default WalletBalance;
