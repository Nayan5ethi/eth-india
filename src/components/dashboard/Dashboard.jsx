import React, { ReactNode, useContext, useState } from 'react';

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Img,
    color,
    background,
    Divider,
    Tooltip,
    Alert,
    AlertIcon,
    useToast,
} from '@chakra-ui/react';

import MenuIcon from '@mui/icons-material/Menu';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { Outlet, NavLink as ReachLink, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import Metamask from "../../assets/metamask.svg"
import { UserWalletContext } from '../../context/userWalletContext';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const LinkItems = [
    { name: 'Home', icon: HouseSidingIcon, route: "/" },
    { name: 'Rentals', icon:CurrencyExchangeIcon , route: "rentals" },
    { name: 'Sale', icon:AttachMoneyIcon , route: "sale" },
];


export default function SecurityDashboard() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (

        <Box minH="100vh"  >
            <Flex  >
                <SidebarContent

                    onClose={() => onClose}
                    display={{ base: 'none', md: 'block' }}
                />


                <Drawer

                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="xs">
                    <DrawerContent >
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Flex className='mobileview' ml={{ base: 0, md: 60 }} direction={"column"}>
                {/* mobilenav */}
                <MobileNav onOpen={onOpen} />
                <Outlet />

            </Flex>
        </Box >

    );
}


const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex alignItems="center" w="100%" justifyContent={["space-evenly","center",]}>
          <Img w={["40%","50%"]} src={Logo}>
          </Img>
                <CloseButton boxShadow={"base"} display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Divider />
            <Flex direction={"column"} my="5" >
            {LinkItems.map((link) => (
                <NavItem  onClose={onClose} route={link.route} key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
                
            ))}
            </Flex>
        </Box>
    );
};

const NavItem = ({ icon, onClose, children, route, ...rest }) => {
    return (
        <Link
        onClick={onClose}
        my="1"
            as={ReachLink} to={route} 
            style={{
                textDecoration:'none'
            }}
            _hover={{
                border:"0.5px solid gray",
                color: 'black',
            }}
            alignItems="center"
                p="4"
                mx="4"
                color={'black'}
                _activeLink={{
                    backgroundColor:"cyan.300",
                    color:"black",
                    fontWeight:"500"
                }}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                
                display={'flex'}
            >
            
                
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'black',
                        }}
                        as={icon}
                    />
                )}
                {children}
        </Link>
    );
};


const MobileNav = ({ onOpen, ...rest }) => {
    const { selectedAccount } = useContext(UserWalletContext);
    const [alert,setAlert]=useState(false)
    let imagesrc=sessionStorage.getItem("image")
    const navigate = useNavigate();
    const toast = useToast()
    return (
        <>

        <Flex
            ml={{ base: 0, md: 0 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<MenuIcon />}
            />



            <HStack spacing={{ base: '0', md: '6' }}>
                
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                        p="4"
                        rounded={"20px"}
                            bg={"blue.500"}
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={Metamask}
                                />
                            
                           
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            
                            <MenuItem 
               onClick={() => {
                
                navigator.clipboard.writeText(selectedAccount)
                toast({
                              position: 'bottom-right',
                    title: 'Copied .',
                    description: "Copied to your clipboard.",
                    status: 'success'
                    ,
                    duration: 5000,
                    isClosable: true,
                  })
           
            }}
                
                >
  <Tooltip label={selectedAccount}>
    <Text>
                                    {selectedAccount.substring(0,20)}...
                                    </Text>
                                    </Tooltip>
                                    
                                    </MenuItem>
                                    <MenuDivider/>
                                    <MenuItem  onClick={()=>{
                  navigate("profile")
                }}>Profile</MenuItem>

                            <MenuDivider />
                            <MenuItem
                            onClick={()=>{
                                sessionStorage.clear()
                                navigate("/")
                            }}
                            >Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
        </>
    );
};