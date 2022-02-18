import ProductPage from 'components/product/ProductPage'
import { BedIndex } from 'constants/productTokens'
import { useMarketData } from 'providers/MarketData/MarketDataProvider'
import { useSetComponents } from 'providers/SetComponents/SetComponentsProvider'

const BED = () => {
  const { bed } = useMarketData()
  const { bedComponents } = useSetComponents()
  return (
    <ProductPage
      tokenData={BedIndex}
      marketData={bed || {}}
      components={bedComponents || []}
    ></ProductPage>
  )
}

export default BED