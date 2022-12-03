import Web3 from 'web3';
import CoOwnAbi from "./CoOwnNFT.json";
import { UserWalletContext } from "./context/userWalletContext";
import useContext from "react";
let CoOwnNFTContract;

export const init = async (setSelectedAccount,
setIsInitialized) => {
	if(!window.ethereum)
    {
      console.log("metamask not present");
    }
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
          setIsInitialized(true);
          console.log(`Selected account is ${accounts[0]}`);
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      window.ethereum.on('accountsChanged', function (accounts) {
        setSelectedAccount(accounts[0]);
        console.log(`Selected account changed to ${accounts[0]}`);
      });
    }

	const web3 = new Web3(provider);
	CoOwnNFTContract = new web3.eth.Contract(
		CoOwnAbi,
		'0xC4E83A8aC9152c75D929BC3120679d3f26bAe7E8'
	);

	setIsInitialized(true)
};

export const AddProperty = async () => {
    const { selectedAccount } = useContext(UserWalletContext);
	// if (selectedAccount) {
	// 	await init(s);
	// }

	return CoOwnNFTContract.methods
		.addPropety(selectedAccount)
		.call()
		.then((balance) => {
			return Web3.utils.fromWei(balance);
		});
};