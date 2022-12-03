import React from 'react'; 
import { useState,useContext,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Web3 from 'web3';
import { UserWalletContext } from "./context/userWalletContext";
import { AuthenticatedRoute } from "./components/route/authenticatedRoute";
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes,Switch } from 'react-router-dom';
import PropertyListing from './components/property/PropertyListing';
import { ChakraProvider } from '@chakra-ui/react';
import PropertyDetails from './components/property/PropertyDetails';
import AddAsset from './components/form/AddAsset';
import TransferForm from './components/form/TranferOwnership';
import {Typography} from "@mui/material" 
import Logo from "./assets/logo.png"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Img} from "@chakra-ui/react"
import { extendTheme } from '@chakra-ui/react'
import CoOwnAbi from "./build-contracts/CoOwnNFT.json";
import HouseSale from './components/marketplace/HouseSale';
import SaleDetails from './components/marketplace/SaleDetails';

const themeC = extendTheme({
  fonts: {
    heading: `'Poppins',
        'sans-serif'`,
    body: `'Poppins',
        'sans-serif'`,
  },
})
const theme = createTheme({
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif'
      ].join(','),
    }
  });
function App() {  
  const [selectedAccount,setSelectedAccount]=useState("");
  const [isInitialized,setIsInitialized]=useState(false);
   let provider = window.ethereum;
    const web3 = new Web3(provider);
  useEffect(()=>{
    if(!window.ethereum)
    {
      window.open("https://metamask.io/download/");
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
		'0xbA2574b840Ca2aF8b742b9876f1e6Afd775a0b9e'
	);

  
  
  function web3init()
  {
    console.log("DSadd");
    if(!window.ethereum)
    {
      window.open("https://metamask.io/download/");
      console.log("metamask not present");
    }
    let provider = window.ethereum;
    const web3 = new Web3(provider);
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
  }
  return (
    <ThemeProvider theme={theme}>
    <UserWalletContext.Provider value={{ selectedAccount, setSelectedAccount }}>
      {
        isInitialized?
        <ChakraProvider theme={themeC}>
          <BrowserRouter>
            <Routes> 
              <Route path="/" element={<AuthenticatedRoute/> } > 
                  <Route exact path='/' element={<Dashboard/>}> 
                    <Route index element={<PropertyListing  />} />
                    <Route path='rentals'  element={<PropertyListing />} />
                    <Route path='sale'  element={<HouseSale sale={true}/>} />
                    <Route path='sale/:id'  element={<SaleDetails/>} ></Route>
                    <Route index element={<PropertyListing Contract={CoOwnNFTContract} />} />
                    <Route path='listing'  element={<PropertyListing Contract={CoOwnNFTContract}/>} />
                    <Route path='transfer/:id'  element={<TransferForm/>} />
                    <Route path='propertydetails'  element={<PropertyDetails/>} />
                    <Route path='add' element={<AddAsset Contract={CoOwnNFTContract}/>} />
                  </Route>
              </Route>
            </Routes> 
          </BrowserRouter>
          </ChakraProvider>
          :
          <div className='slide-in-elliptic-top-fwd' style={{height:"85vh", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <Img  w={["20%","20%"]} src={Logo}/>

            <Typography variant='h3' textAlign={"center"} sx={{my:3}}>Login with your metamask account </Typography>
            <Button className="bounce-top" onClick={web3init} sx={{my:3}} variant="outlined"  startIcon={<Img w={["40px","40px"]} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"} />}>
              Login with Metamask
            </Button>
          </div>
      }
  
    </UserWalletContext.Provider>
    </ThemeProvider>

  );
}

export default App;
 