// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Counter} from '../src/Counter.sol';
import 'forge-std/Test.sol';

contract CounterTest is Test {
  Counter c;

  function setUp() public {
    c = new Counter();
  }

  function testIncrementCounter() public {
    require(c.getCount() == 0, 'Counter should be 0');
    c.increment();
    require(c.getCount() == 1, 'Counter should be 1');
  }
}
