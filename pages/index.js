import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';
import Image from 'next/image'
import Link from 'next/link'

const Banner = ({ url, purpose, title, subtitle, desc, subdesc, query, text }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={url} width={500} height={300} alt='image' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{ purpose }</Text>
      <Text fontSize='3xl' fontWeight='bold'>{ title }<br/>{ subtitle }</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{ desc }<br/>{ subdesc }</Text>

      <Button fontSize='xl' bg='teal.400' color='white'>
        <Link href={query}><a>{text}</a></Link>
      </Button>
    </Box>
  </Flex>
)

export async function getStaticProps() {
  const sales = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`); 
  const rents = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  
  return {
    props: {
      sales: sales?.hits,
      rents: rents?.hits,
    }
  }
}

export default function Home({ sales, rents }) {
  return (
    <>
      <Box>
        <Banner 
          purpose='RENT A HOME'
          title='Rental Homes for'
          subtitle='Everyone'
          desc='Explore from Apartments, builder floors, villas'
          subdesc='and more'
          text='Explore Renting'
          query='/search?purpose=for-rent'
          url='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />
        <Flex flexWrap='wrap' >
          {rents.map((property, index) => <Property property={property} key={index} />)}
        </Flex>

        <Banner 
          purpose='BUY A HOME'
          title='Find, Buy & Own Your'
          subtitle='Dream home'
          desc='Explore from Apartments, land, builder floors,'
          subdesc='villas and more'
          text='Explore Buying'
          query='/search?purpose=for-sale'
          url='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        />
        <Flex flexWrap='wrap' >
          {sales.map((property, index) => <Property property={property} key={index} />)}
        </Flex>

      </Box>
    </>
  )
}
