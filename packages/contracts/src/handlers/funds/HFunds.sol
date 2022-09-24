// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '../HandlerBase.sol';

contract HFunds is HandlerBase {
  using SafeERC20 for IERC20;

  function getContractName() public pure override returns (string memory) {
    return 'HFunds';
  }

  function inject(address[] calldata tokens, uint256[] calldata amounts)
    external
    payable
    returns (uint256[] memory)
  {
    return _inject(tokens, amounts);
  }

  function _inject(address[] calldata tokens, uint256[] calldata amounts)
    internal
    returns (uint256[] memory)
  {
    _requireMsg(tokens.length == amounts.length, 'inject', 'token and amount does not match');
    address sender = _getSender();
    uint256[] memory amountsInProxy = new uint256[](amounts.length);

    for (uint256 i = 0; i < tokens.length; i++) {
      _notMaticToken(tokens[i]);
      IERC20(tokens[i]).safeTransferFrom(sender, address(this), amounts[i]);

      amountsInProxy[i] = amounts[i];

      // Update involved token
      _updateToken(tokens[i]);
    }
    return amountsInProxy;
  }
}
