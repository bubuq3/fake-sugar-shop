import { useRef, useCallback } from 'react';
import {
  Stack,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
} from '@chakra-ui/react';
import MainCategoriesNavigation from '../main-categories-navigation';
import Pagination from '../pagination';
import { Search2Icon } from '@chakra-ui/icons';
import { useKeyPressEvent } from 'react-use';
import { useDebouncedCallback } from 'use-debounce';

const TopBarNavigation = ({
  sugarsConnection,
  setSkip,
  skip,
  categoryPath,
  setSearchValue,
}) => {
  const debounced = useDebouncedCallback(
    useCallback((searchValue) => {
      setSearchValue(searchValue);
    }, []),
    1000,
    { maxWait: 2000 }
  );

  // search input focus start

  const inputRef = useRef();

  useKeyPressEvent((e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      inputRef.current.focus();
    }
    return false;
  });

  useKeyPressEvent((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      inputRef.current.blur();
    }
    return false;
  });

  // search input focus end
  return (
    <Stack
      justify='space-between'
      w='100%'
      direction={{ base: 'column', md: 'row' }}
      align='center'
    >
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>

          <Input
            placeholder='Wyszukaj produkt (ctrl+k)'
            type='text'
            onChange={(event) => debounced(event.target.value)}
            focusBorderColor='teal.300'
            ref={inputRef}
            onClick={() => setSkip(0)}
            onFocus={() => setSkip(0)}
          />
        </InputGroup>
      </Box>

      <HStack>
        <MainCategoriesNavigation categoryPath={categoryPath} />
      </HStack>

      <Box>
        {sugarsConnection.edges.length >= 0 && (
          <Pagination
            hasPreviousPage={sugarsConnection.pageInfo.hasPreviousPage}
            hasNextPage={sugarsConnection.pageInfo.hasNextPage}
            skip={skip}
            setSkip={setSkip}
          />
        )}
      </Box>
    </Stack>
  );
};

export default TopBarNavigation;
