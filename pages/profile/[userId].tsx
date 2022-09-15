import PageLayout from '@/components/page-layout';
import { Box, Heading, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { GetServerSideProps } from 'next';
import hygraph from '@/utils/graphqlRequestClient';
import { gql } from 'graphql-request';
import NextLink from 'next/link';

const Profile = ({ order }) => {
  console.log(order);

  const productTitles = order.map((item) => item.productTitle);
  const productQuantity = order.map((item) => item.quantity);
  console.log('product titles', productTitles);
  console.log('product quantities', productQuantity);

  const username = order[0].userId;

  const orderTitles = order.map((order) => order.orderTitle);
  console.log('order titles', orderTitles);

  const dateFormat = (date) => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('/');
  };

  return (
    <PageLayout title='profile' description='profile dsc'>
      <Box py={8}>
        <Heading>
          Cześć{' '}
          <Box as='span' color='teal.400'>
            {username}
          </Box>
          👋
        </Heading>
        <Box>
          <Heading as='h2' fontSize='2xl' pt={4}>
            Oto twoje zamowienia
          </Heading>

          {order.map((item) => (
            <Box key={item.orderTitle}>
              <NextLink href={`/profile/orders/${item.orderTitle}`}>
                <HStack
                  bg='gray.50'
                  p={6}
                  m={4}
                  justify='space-between'
                  rounded='lg'
                  cursor='pointer'
                  _hover={{
                    bg: 'gray.100',
                  }}
                >
                  <Text>{item.orderTitle}</Text>
                  <Text>{dateFormat(item.date)}</Text>
                </HStack>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentUser = context.params.userId;
  console.log('context', currentUser);

  const query = gql`
    query ($currentUser: String!) {
      orders(where: { userId: $currentUser }) {
        userId
        orderTitle
        date
      }
    }
  `;
  const variables = { currentUser };
  const order = await hygraph.request(query, variables);

  return {
    props: {
      order: order.orders,
    },
  };
};
