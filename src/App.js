import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyListing from './components/PropertyListing';
import { ChakraProvider } from '@chakra-ui/react';
import AddAsset from './components/form/AddAsset';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Dashboard/>}>

  <Route path='listing' element={<PropertyListing/>} ></Route>
  <Route path='add' element={<AddAsset/>} ></Route>
</Route>



    </Routes>
  </BrowserRouter>
  </ChakraProvider>
  );
}

export default App;
