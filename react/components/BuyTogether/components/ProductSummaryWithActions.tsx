import React, { useMemo } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'

interface Props {
  product?: Product
  index?: number
  hidden?: boolean
  hideChangeAction?: boolean
  onDeleteOrAdd?: (index: number) => void
  onChangeProduct?: (index: number) => void
  onProductClick?: (product: Product) => void
}

const ProductSummaryWithActions: StorefrontFC<Props> = ({ product }) => {
  const normalizedProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(product),
    [product]
  )

  return (
    <div className="">
      <ExtensionPoint id="product-summary.shelf" product={normalizedProduct} />
    </div>
  )
}

export default ProductSummaryWithActions
