import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi'
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
        <Flex p='2' borderBottom='1px' borderColor='gray.100'>
            <Box fontSize='3xl' color='teal.400' fontWeight='bold'>
                <Link href='/'>Real estate project</Link>
            </Box>    
            <Spacer />
            <Box>
                <Menu>
                    <MenuButton as={IconButton} icon={<FcMenu />} variant='outlined' color='red.400' />
                    <MenuList>
                        <Link href='/' passHref>
                            <MenuItem icon={<FcHome />}>Home</MenuItem>
                        </Link>
                        <Link href='/search' passHref>
                            <MenuItem icon={<BsSearch />}>Search</MenuItem>
                        </Link>
                        <Link href='/search?purpose=for-sale' passHref>
                            <MenuItem icon={<FcAbout />}>Buy property</MenuItem>
                        </Link>
                        <Link href='/search?purpose=for-rent' passHref>
                            <MenuItem icon={<FiKey />}>Rent property</MenuItem>
                        </Link>
                    </MenuList>
              </Menu>
          </Box>
      </Flex>
  );
};

export default Navbar;
