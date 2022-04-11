import { BigNumber } from 'ethers'

import { ChainId } from '@usedapp/core'

import { get0xQuote } from 'utils/zeroExUtils'

import {
  Exchange,
  LeveragedTokenData,
  slippagePercentage,
  SwapData,
} from './exchangeIssuanceQuotes'

// Used for redeeming
export const getSwapDataCollateralDebt = async (
  leveragedTokenData: LeveragedTokenData,
  includedSources: string,
  chainId: ChainId = ChainId.Polygon
) => {
  console.log('HEERE')
  let result = await getSwapData(
    {
      buyToken: leveragedTokenData.debtToken,
      sellToken: leveragedTokenData.collateralToken,
      sellAmount: leveragedTokenData.collateralAmount.toString(),
      includedSources,
    },
    chainId
  )
  console.log('///')
  console.log(leveragedTokenData.debtToken, leveragedTokenData.collateralToken)
  console.log(leveragedTokenData)
  if (!result) return null
  const { swapData: swapDataDebtCollateral, zeroExQuote } = result
  const collateralObtained = BigNumber.from(zeroExQuote.buyAmount)
  return { swapDataDebtCollateral, collateralObtained }
}

// Used for issuance
export const getSwapDataDebtCollateral = async (
  leveragedTokenData: LeveragedTokenData,
  includedSources: string,
  chainId: ChainId = ChainId.Polygon
) => {
  let result = await getSwapData(
    {
      buyToken: leveragedTokenData.collateralToken,
      sellToken: leveragedTokenData.debtToken,
      sellAmount: leveragedTokenData.debtAmount.toString(),
      includedSources,
    },
    chainId
  )
  if (!result) return null
  const { swapData: swapDataDebtCollateral, zeroExQuote } = result
  const collateralObtained = BigNumber.from(zeroExQuote.buyAmount)
  return { swapDataDebtCollateral, collateralObtained }
}

export const getSwapData = async (params: any, chainId: number = 137) => {
  // TODO: error handling (for INSUFFICIENT_ASSET_LIQUIDITY)
  const zeroExQuote = await get0xQuote(
    {
      ...params,
      slippagePercentage,
    },
    chainId
  )
  const swapData = swapDataFrom0xQuote(zeroExQuote)
  console.log(swapData)
  if (swapData) return { swapData, zeroExQuote }
  return null
}

function getEchangeFrom0xKey(key: string | undefined): Exchange | null {
  switch (key) {
    case 'Curve':
      return Exchange.Curve
    case 'QuickSwap':
      return Exchange.Quickswap
    case 'SushiSwap':
      return Exchange.Sushiswap
    case 'Uniswap_V3':
      return Exchange.UniV3
    default:
      return null
  }
}

function swapDataFrom0xQuote(zeroExQuote: any): SwapData | null {
  if (zeroExQuote.orders.length < 1) return null

  const order = zeroExQuote.orders[0]
  const fillData = order.fillData
  const exchange = getEchangeFrom0xKey(order.source)

  console.log(order, fillData, exchange)

  if (!fillData || !exchange) return null

  if (exchange === Exchange.Curve) {
    return swapDataFromCurve(order)
  }

  // Currently this works for Sushi, needs to be checked with additional exchanges
  return {
    exchange,
    path: fillData.tokenAddressPath,
    fees: [],
    pool: '0x0000000000000000000000000000000000000000',
  }
}

function swapDataFromCurve(order: any): SwapData | null {
  const fillData = order.fillData
  if (!fillData) return null
  return {
    exchange: Exchange.Curve,
    path: fillData.pool.tokens,
    fees: [],
    pool: fillData.pool.poolAddress,
  }
}
