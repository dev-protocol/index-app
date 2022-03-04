import { useEffect, useState } from 'react'

import { colors, useICColorMode } from 'styles/colors'

import { UpDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers } from '@usedapp/core'

import { MAINNET, POLYGON } from 'constants/chains'
import indexNames, {
  DefiPulseIndex,
  ETH,
  mainnetCurrencyTokens,
  polygonCurrencyTokens,
  Token,
} from 'constants/tokens'
import { useFormattedBalance } from 'hooks/useFormattedBalance'
import { displayFromWei } from 'utils'

import QuickTradeSelector from './QuickTradeSelector'

enum QuickTradeState {
  default,
  executing,
  loading,
}

const QuickTrade = () => {
  const { isDarkMode } = useICColorMode()
  const { chainId } = useEthers()

  const [isBuying, setIsBuying] = useState<boolean>(true)
  const [buyToken, setBuyToken] = useState<Token>(DefiPulseIndex)
  const [buyTokenList, setBuyTokenList] = useState<Token[]>(indexNames)
  const [sellToken, setSellToken] = useState<Token>(ETH)
  const [sellTokenList, setSellTokenList] = useState<Token[]>(
    chainId === MAINNET.chainId ? mainnetCurrencyTokens : polygonCurrencyTokens
  )
  const [compState, setCompState] = useState<QuickTradeState>(
    QuickTradeState.default
  )

  /**
   * Switches sell token lists between mainnet and polygon
   */
  useEffect(() => {
    if (chainId === MAINNET.chainId) {
      setBuyTokenList(indexNames)
      setSellTokenList(mainnetCurrencyTokens)
    } else {
      setBuyTokenList(indexNames)
      setSellTokenList(polygonCurrencyTokens)
    }
  }, [chainId])

  /**
   * Get the list of currency tokens for the selected chain
   * @returns {Token[]} list of tokens
   */
  const getCurrencyTokensByChain = () => {
    if (chainId === POLYGON.chainId) return polygonCurrencyTokens
    return mainnetCurrencyTokens
  }

  /**
   * Sets the list of tokens based on if the user is buying or selling
   */
  const swapTokenLists = () => {
    let buyTemp = buyToken
    let sellTemp = sellToken
    if (isBuying) {
      setSellTokenList(getCurrencyTokensByChain())
      setBuyTokenList(indexNames)
    } else {
      setSellTokenList(indexNames)
      setBuyTokenList(getCurrencyTokensByChain())
    }
    setBuyToken(sellTemp)
    setSellToken(buyTemp)
    setIsBuying(!isBuying)
  }

  const onChangeSellToken = (symbol: string) => {
    const filteredList = sellTokenList.filter(
      (token) => token.symbol === symbol
    )
    if (filteredList.length < 0) {
      return
    }
    setSellToken(filteredList[0])
  }

  const onChangeBuyToken = (symbol: string) => {
    const filteredList = buyTokenList.filter((token) => token.symbol === symbol)
    if (filteredList.length < 0) {
      return
    }
    setBuyToken(filteredList[0])
  }

  const isDisabled =
    compState === QuickTradeState.loading ||
    compState === QuickTradeState.executing
  const isLoading = compState === QuickTradeState.loading
  const isButtonDisabled = compState === QuickTradeState.default

  return (
    <Flex
      border='2px solid #F7F1E4'
      borderColor={isDarkMode ? colors.icWhite : colors.black}
      borderRadius='16px'
      direction='column'
      py='20px'
      px='40px'
    >
      <Flex>
        <Text fontSize='24px' fontWeight='700'>
          Quick Trade
        </Text>
      </Flex>
      <Flex direction='column' my='20px'>
        <QuickTradeSelector
          title='From'
          config={{ isDarkMode, isDisabled }}
          selectedToken={sellToken}
          tokenList={sellTokenList}
          onChange={onChangeSellToken}
        />
        <Box h='12px' alignSelf={'flex-end'}>
          <IconButton
            background='transparent'
            margin={'6px 0'}
            aria-label='Search database'
            borderColor={isDarkMode ? colors.icWhite : colors.black}
            color={isDarkMode ? colors.icWhite : colors.black}
            icon={<UpDownIcon />}
            onClick={swapTokenLists}
          />
        </Box>
        <QuickTradeSelector
          title='To'
          config={{ isDarkMode, isDisabled, isReadOnly: true }}
          selectedToken={buyToken}
          tokenList={buyTokenList}
          onChange={onChangeBuyToken}
        />
      </Flex>
      <Flex>
        <Button
          background={isDarkMode ? colors.icWhite : colors.icYellow}
          border='0'
          borderRadius='12px'
          color='#000'
          disabled={isButtonDisabled}
          fontSize='24px'
          fontWeight='600'
          isLoading={isLoading}
          height='54px'
          w='100%'
        >
          Trade
        </Button>
      </Flex>
    </Flex>
  )
}

export default QuickTrade
