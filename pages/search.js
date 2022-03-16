import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';
import Property from '../components/Property';
import Filters from '../components/Filters';
import { BsFilter } from 'react-icons/bs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';

export async function getServerSideProps({ query }) {
    const purpose = query?.purpose || 'for-rent' ;
    const rent = query?.rent || 'yearly' ;
    const minPrice = query?.minPrice || '0' ;
    const maxPrice = query?.maxPrice || '1000000' ;
    const minRooms = query?.roomsMin || '0';
    const minBaths = query?.bathsMin || '0';
    const sort = query?.sort || 'price-desc';
    const maxArea = query?.areaMax || '35000';
    const locationExternalIDs = query?.locationExternalIDs || '5002';
    const categoryExternalID = query?.categoryExternalID || '4';
    
    const properties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${minBaths}&rentFrequency=${rent}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${minRooms}&sort=${sort}&areaMax=${maxArea}`);

    return {
        props: {
            properties: properties?.hits,
        }
    }
}

const Search = ({ properties }) => {
    const [filters, setFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor='pointer'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                p='2'
                bg='gray.100'
                onClick={() => setFilters(!filters)}
            >
                <Text>Search Properties By Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>

            {filters && <Filters />}
            <Text fontSize='2xl' padding='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {properties?.map((property, index) => <Property property={property} key={index} />)}
            </Flex>
            {!properties && (
                <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt='no result' src={noresult} />
                    <Text fontSize='2xl' marginTop='3'>No results found</Text>
                </Flex>
            )}
        </Box>
    );
};

export default Search;
