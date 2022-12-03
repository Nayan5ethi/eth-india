import React,{Fragment} from 'react'; 
import { useState,useContext,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { UserWalletContext } from "./context/userWalletContext";
import { AuthenticatedRoute } from "./components/route/authenticatedRoute";
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes,Switch } from 'react-router-dom';
import PropertyListing from './components/property/PropertyListing';
import { ChakraProvider } from '@chakra-ui/react';
import PropertyDetails from './components/property/PropertyDetails';
import AddAsset from './components/form/AddAsset';
import CoOwnAbi from "./CoOwnNFT.json";


function App() {  
  const [selectedAccount,setSelectedAccount]=useState("");
  const [isInitialized,setIsInitialized]=useState(false);
   let provider = window.ethereum;
    const web3 = new Web3(provider);
  useEffect(()=>{
    if(!window.ethereum)
    {
      console.log("metamask not present");
    }
   

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
        setIsInitialized(true);
        console.log(`Selected account changed to ${accounts[0]}`);
      });
    }
  },[])

  const CoOwnNFTContract = new web3.eth.Contract(
		CoOwnAbi,
		'0xC4E83A8aC9152c75D929BC3120679d3f26bAe7E8'
	);

  
  return (
    <UserWalletContext.Provider value={{ selectedAccount, setSelectedAccount }}>
      {
        isInitialized?
        <ChakraProvider>
          <BrowserRouter>
            <Routes> 
              <Route path="/" element={<AuthenticatedRoute/> } > 
                  <Route exact path='/' element={<Dashboard/>}> 
                    <Route index element={<PropertyListing />} />
                    <Route path='listing'  element={<PropertyListing/>} ></Route>
                    <Route path='propertydetails'  element={<PropertyDetails/>} ></Route>
                    <Route path='add' element={<AddAsset Contract = {CoOwnNFTContract}/>} ></Route>
                    <Route path='rentals'  element={<PropertyListing/>} ></Route>
                  </Route>
              </Route>
            </Routes> 
          </BrowserRouter>
          </ChakraProvider>
          :
          ""
      }
  
    </UserWalletContext.Provider>

  );
}

export default App;
 