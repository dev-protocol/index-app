import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react'

import closeIcon from 'assets/warning-close-button.svg'

const WarningMessage = (props: {
  message: string
  closeAction: () => void
}) => {
  return (
    <Flex
      background='rgba(250, 191, 0, 0.2)'
      border='1px solid #FABF00'
      my='20px'
    >
      <Box background='#FABF00' w='6px' />
      <Text fontSize='sm' fontWeight='600' px='16px' py='10px'>
        {props.message}
      </Text>
      <Spacer />
      <Button
        background='rgba(250, 191, 0, 0)'
        border='0'
        onClick={props.closeAction}
      >
        <Image src={closeIcon} alt='close warning message' w='16px' h='16px' />
      </Button>
    </Flex>
  )
}

export default WarningMessage