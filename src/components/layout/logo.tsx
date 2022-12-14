import { TbPaperBag } from 'react-icons/tb';
import { Icon, Flex, Heading, Link, Box } from '@chakra-ui/react';

import NextLink from 'next/link';

const Logo = () => {
  return (
    <Box id='logo-box'>
      <NextLink href='/' passHref>
        <Link style={{ textDecoration: 'none' }}>
          <Flex fontSize='4xl' fontWeight={500}>
            <Icon
              as={TbPaperBag}
              _hover={{
                transform: 'rotate(20deg)',
              }}
              id='logo-box-child'
              color='black'
            />

            <Heading as='h1' display={{ base: 'none', sm: 'inline-block' }}>
              drogi-cukier
            </Heading>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  );
};

export default Logo;
