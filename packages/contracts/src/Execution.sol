// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import './handlers/aavev3/IPool.sol';
import './handlers/aavev3/IPoolAddressesProvider.sol';
import './interfaces/IERC20Usdt.sol';
import './handlers/univ3/ISwapRouter.sol';

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract Execution is Ownable {
  using SafeERC20 for IERC20;

  //Goerli
  address public constant PROVIDER = 0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D;
  ISwapRouter public constant ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
  address public constant NATIVE_TOKEN_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

  function getContractName() public pure returns (string memory) {
    return 'Execution';
  }

  function transferToken(
    address token,
    address to,
    uint256 amount,
    address originationAddress
  ) external onlyOwner {
    IERC20(token).safeTransferFrom(originationAddress, to, amount);
  }

  function exactInputSingle(
    address originationAddress,
    address tokenIn,
    address tokenOut,
    uint24 fee,
    address destinationAddress,
    uint256 amountIn
  ) external payable onlyOwner returns (uint256 amountOut) {
    // Build params for router call
    ISwapRouter.ExactInputSingleParams memory params;
    params.tokenIn = tokenIn;
    params.tokenOut = tokenOut;
    params.fee = fee;
    params.amountIn = _getBalance(tokenIn, amountIn);
    params.amountOutMinimum = 0;
    params.sqrtPriceLimitX96 = 0;
    params.recipient = destinationAddress;

    IERC20(tokenIn).safeTransferFrom(originationAddress, address(this), amountIn);
    _tokenApprove(tokenIn, address(ROUTER), params.amountIn);
    amountOut = _exactInputSingle(0, params);
  }

  function depositAaveV3(
    address token,
    uint256 amount,
    address destinationAddress,
    address originationAddress
  ) external payable onlyOwner {
    amount = _getBalance(token, amount);
    IERC20(token).safeTransferFrom(originationAddress, address(this), amount);
    _depositAaveV3(token, amount, destinationAddress);
  }

  function _depositAaveV3(
    address asset,
    uint256 amount,
    address destinationAddress
  ) internal {
    (address pool, ) = _getPoolAndAToken(asset);
    _tokenApprove(asset, pool, amount);
    try IPool(pool).supply(asset, amount, destinationAddress, 0) {} catch Error(
      string memory reason
    ) {
      _revertMsg('supply', reason);
    } catch {
      _revertMsg('supply');
    }
  }

  /* ========== INTERNAL FUNCTIONS ========== */

  function _getPoolAndAToken(address underlying)
    internal
    view
    returns (address pool, address aToken)
  {
    pool = IPoolAddressesProvider(PROVIDER).getPool();
    try IPool(pool).getReserveData(underlying) returns (DataTypes.ReserveData memory data) {
      aToken = data.aTokenAddress;
      _requireMsg(aToken != address(0), 'General', 'aToken should not be zero address');
    } catch Error(string memory reason) {
      _revertMsg('General', reason);
    } catch {
      _revertMsg('General');
    }
  }

  function _exactInputSingle(uint256 value, ISwapRouter.ExactInputSingleParams memory params)
    internal
    returns (uint256)
  {
    params.deadline = block.timestamp;

    try ROUTER.exactInputSingle{value: value}(params) returns (uint256 amountOut) {
      return amountOut;
    } catch Error(string memory reason) {
      _revertMsg('exactInputSingle', reason);
    } catch {
      _revertMsg('exactInputSingle');
    }
  }

  function _tokenApprove(
    address token,
    address spender,
    uint256 amount
  ) internal {
    try IERC20Usdt(token).approve(spender, amount) {} catch {
      IERC20(token).safeApprove(spender, 0);
      IERC20(token).safeApprove(spender, amount);
    }
  }

  function _getBalance(address token, uint256 amount) internal view returns (uint256) {
    if (amount != type(uint256).max) {
      return amount;
    }

    // ETH case
    if (token == address(0) || token == NATIVE_TOKEN_ADDRESS) {
      return address(this).balance;
    }
    // ERC20 token case
    return IERC20(token).balanceOf(address(this));
  }

  function _requireMsg(
    bool condition,
    string memory functionName,
    string memory reason
  ) internal pure {
    if (!condition) _revertMsg(functionName, reason);
  }

  function _revertMsg(string memory functionName, string memory reason) internal pure {
    revert(string(abi.encodePacked(getContractName(), '_', functionName, ': ', reason)));
  }

  function _revertMsg(string memory functionName) internal pure {
    _revertMsg(functionName, 'Unspecified');
  }
}
