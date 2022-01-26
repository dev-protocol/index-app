import { useState } from 'react'

import { Box, Flex, Spacer } from '@chakra-ui/react'

import AllAssets from 'components/mining/AllAssets'
import MiningProgram, { Program } from 'components/mining/MiningProgram'
import WarningMessage from 'components/mining/WarningMessage'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useMarketData } from 'contexts/MarketData/MarketDataProvider'

const LiquidityMining = () => {
  const { dpi } = useMarketData()

  const [warning, setWarning] = useState<string | null>(
    'Metaverse Index Liquidity Mining Rewards go live April 8th, 12pm PST.'
  )

  const programs: Program[] = [
    {
      title: 'DPI Liquidity Program',
      isActive: true,
      staked: {
        caption: 'Staked ETH/DPI Uniswap LP Tokens',
        value: '10.2 ',
        valueExtra: 'ETH / DPI',
      },
      apy: {
        caption: '(volatile)',
        value: '40.2%',
      },
      unclaimed: {
        caption: 'Unclaimed INDEX in pool',
        value: '421.23',
        valueExtra: 'INDEX',
      },
    },
    {
      title: 'MVI Liquidity Program',
      isActive: false,
      staked: {
        caption: 'Staked ETH/MVI Uniswap LP Tokens',
        value: '0.0',
        valueExtra: 'ETH / MVI',
      },
      apy: {
        caption: '(volatile)',
        value: '0.0%',
      },
      unclaimed: {
        caption: 'Unclaimed INDEX in pool',
        value: '0.0',
        valueExtra: 'INDEX',
      },
    },
  ]

  const closeWarningMessage = () => {
    setWarning(null)
  }

  return (
    <Page>
      <Box minW='1280px' mx='auto'>
        <PageTitle
          title='Liquidity Mining Programs'
          subtitle='Earn rewards for supplying liquidity for Index Coop products'
        />
        {warning && (
          <WarningMessage message={warning} closeAction={closeWarningMessage} />
        )}
        <Flex>
          <Flex direction='column' w='50%'>
            {programs.map((program, index) => {
              return (
                <Box key={index} my='10'>
                  <MiningProgram program={program} />
                </Box>
              )
            })}
          </Flex>
          <Spacer />
          <Flex minW='420px' my='10'>
            <AllAssets
              isActive={true}
              capitalInFarms='$1.24bln'
              indexPrice='$645.90'
            />
          </Flex>
        </Flex>
      </Box>
    </Page>
  )
}

export default LiquidityMining