import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [year, setYear] = useState('');

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
    

    return (
        <Box textAlign='center' p='5' color='teal.400'>
            © {year} Real estate project, Inc.
        </Box>
    );
};

export default Footer;
