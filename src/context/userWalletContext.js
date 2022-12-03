import { createContext,React, useContext } from "react";
import {
    ChainId
  } from "@biconomy/core-types";
  
  import SmartAccount from "@biconomy/smart-account";
  
  export const Web3AuthContext = React.createContext({
    connect: () => Promise.resolve(null),
    disconnect: () => Promise.resolve(),
    loading: false,
    provider: null,
    ethersProvider: null,
    web3Provider: null,
    chainId: "0x13881",
    address: "",
  });
  export const useWeb3AuthContext = () => useContext(Web3AuthContext);
  
  // For contexts check please this repo
  // https://github.com/bcnmy/sdk-demo/tree/main/src/contexts 
  
  // Get the EOA provider for choice of your wallet which manages your signer

