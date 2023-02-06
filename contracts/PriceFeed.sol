// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol-v1/contracts/dapis/DapiReader.sol";


contract PriceFeed is DapiReader {
    constructor(address _dapiServer) DapiReader(_dapiServer) {}

    function readBeaconValueWithId(bytes32 beaconId)
        private
        view
        returns (int224 value)
    {
        value = IDapiServer(dapiServer).readDataFeedValueWithId(beaconId);
    }

    // Our functions go here

    function getUNIprice()
        public
        view
        returns (int224 value)
    {
      return(readBeaconValueWithId(0x96fb7187286f8d4624e8ed33c0676cc487cf2fb24d6b5bfc42b2049f815d9c4b));  
      
    } 
    function getETHprice()
        public
        view
        returns (int224 value)
    {
      return(readBeaconValueWithId(0xc6e0029fb2938d818cbcc547abd5bb702437608d37a281fb2a389212f1b6e778));  
      
    } 

}