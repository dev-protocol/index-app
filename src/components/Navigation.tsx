import { useState } from 'react'

import { colors } from 'styles/colors'

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

import ColorThemeIcon from 'components/header/ColorThemeIcon'

import ConnectButton from './header/ConnectButton'

const NavLink = (props: {
  href: string
  linkText: string
  textColor: string
}) => {
  return (
    <Box mr={['0', '0', '24px', '24px']} mt={['30px', '30px', '0', '0']}>
      <Link
        display='block'
        position='relative'
        href={props.href}
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: ' 100%',
          height: '0.1em',
          backgroundColor: props.textColor,
          opacity: 0,
          transition: 'opacity 300ms, transform 300ms',
        }}
        _focus={{
          _after: {
            opacity: 1,
            transform: 'translate3d(0, 0.2em, 0)',
          },
        }}
        _hover={{
          _after: {
            opacity: 1,
            transform: 'translate3d(0, 0.2em, 0)',
          },
        }}
      >
        <Text fontSize='xl' fontWeight='700'>
          {props.linkText}
        </Text>
      </Link>
    </Box>
  )
}

const NavContent = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const textColor = colorMode === 'light' ? 'black' : 'white'
  return (
    <Flex
      flexDirection={['column', 'column', 'row', 'row']}
      alignItems={'center'}
    >
      <NavLink href='/' linkText='My Dashboard' textColor={textColor} />
      <NavLink href='/products' linkText='Products' textColor={textColor} />
      <NavLink
        href='/liquidity-mining'
        linkText='Liquidity Mining'
        textColor={textColor}
      />
      <IconButton
        aria-label='Color Theme Switch'
        onClick={toggleColorMode}
        border='0'
        background={'transparent'}
        mt={['30px', '30px', '0', '0']}
        mr={['0', '0', '24px', '24px']}
        icon={<ColorThemeIcon color={textColor} />}
        size='sm'
      />
    </Flex>
  )
}

const Navigation = () => {
  const [displayMenu, setDisplayMenu] = useState('none')
  const bgColor = useColorModeValue(colors.icWhite, colors.background)
  return (
    <Flex w={['auto', 'width']} flexGrow={['0', '2']}>
      {/* Desktop Menu */}
      <Flex
        display={['none', 'none', 'flex', 'flex']}
        flexDirection={'row'}
        w='100%'
        justifyContent={'space-between'}
      >
        <NavContent />

        <ConnectButton />
      </Flex>

      {/* Mobile Menu */}
      <Flex display={['flex', 'flex', 'none', 'none']} flexDirection={'column'}>
        <IconButton
          mr={2}
          aria-label='Open Menu'
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={() => setDisplayMenu('flex')}
        />
        <Flex
          flexDir={'column'}
          align={'center'}
          w='100vw'
          h='100vh'
          position='fixed'
          top='0'
          left='0'
          overflowY={'auto'}
          bgColor={bgColor}
          zIndex={30}
          display={displayMenu}
        >
          <IconButton
            m={'16px 32px 30px 0'}
            aria-label='Close Menu'
            alignSelf={'flex-end'}
            size={'md'}
            icon={<CloseIcon />}
            onClick={() => setDisplayMenu('none')}
            display={['flex', 'flex', 'none', 'none']}
          />
          <ConnectButton />
          <NavContent />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navigation
