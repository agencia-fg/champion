import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { ProductListContext } from 'vtex.product-list-context'
import { useQuery } from 'react-apollo'
import { ProductGroupContext } from 'vtex.product-group-context'
import { ExtensionPoint } from 'vtex.render-runtime'

import LazyRender from './utils/LazyRender'
import { mapSKUItemsToCartItems } from './utils/MapSKUItemsToCartItems'
import ProductSummaryWithActions from './components/ProductSummaryWithActions'
import ProductsQuery from './graphql/products.gql'
import Totals from './Totals'
import BuyButton from './components/BuyButton'
import style from './styles.css'

const { ProductGroupProvider, useProductGroup } = ProductGroupContext
const { ProductListProvider } = ProductListContext

interface Props {
  suggestedProducts: any[]
  benefitItems: any[]
}

const Component: StorefrontFC<Props> = ({
  suggestedProducts,
  benefitItems,
}) => {
  const items = useProductGroup()

  return (
    <ProductListProvider listName="BuyTogether">
      <div className="flex-l items-center justify-center">
        <div className="flex items-center justify-center relative ">
          {suggestedProducts.map((product, index) => {
            return (
              <div
                className="w-50 w-auto-ns ph2 ph0-ns flex-ns items-center"
                key={`${product?.productId}-${index}`}
              >
                {index > 0 && (
                  <div className="f1 b c-emphasis absolute static-ns h-100 ph3-ns">
                    <div className="absolute static-ns top-0 bottom-0 flex items-center relative-l nl6 nl0-ns">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                      >
                        <path
                          d="M.5 20A19.5 19.5 0 0 1 20 .5 19.5 19.5 0 0 1 39.5 20 19.5 19.5 0 0 1 20 39.5 19.5 19.5 0 0 1 .5 20ZM20 28.53a1.82 1.82 0 0 0 1.83-1.83v-4.88h4.87A1.82 1.82 0 0 0 28.53 20a1.82 1.82 0 0 0-1.83-1.83h-4.87V13.3A1.82 1.82 0 0 0 20 11.47a1.82 1.82 0 0 0-1.83 1.83v4.87H13.3A1.82 1.82 0 0 0 11.47 20a1.82 1.82 0 0 0 1.83 1.82h4.88v4.88A1.82 1.82 0 0 0 20 28.53Z"
                          style={{ fill: 'var(--primary)' }}
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <ProductSummaryWithActions index={index} product={product} />
              </div>
            )
          })}
        </div>
        <div className="f1 b ph5 c-emphasis dn db-l">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.69"
            height="20.36"
            viewBox="0 0 32.69 20.36"
          >
            <path
              d="M2.94 5.3h26.81a2.44 2.44 0 0 0 2.44-2.43A2.38 2.38 0 0 0 29.75.5H2.94A2.42 2.42 0 0 0 .5 2.87 2.48 2.48 0 0 0 2.94 5.3Zm26.81 9.76H2.94A2.42 2.42 0 0 0 .5 17.43a2.48 2.48 0 0 0 2.44 2.43h26.81a2.44 2.44 0 0 0 2.44-2.43 2.38 2.38 0 0 0-2.44-2.37Z"
              style={{ fill: 'var(--primary)' }}
            />
          </svg>
        </div>
        {items && (
          <div
            className={`${style.buyTogether__totalsContainer} mw6 center ml0-l mr0-l mt6 mt0-l h-100-l`}
          >
            <Totals benefitsItems={benefitItems} skuItems={items.items} />
            <BuyButton skuItems={mapSKUItemsToCartItems(items.items)} />
          </div>
        )}
      </div>
    </ProductListProvider>
  )
}

const BuyTogether: StorefrontFC<Props> = () => {
  const { product } = useProduct()
  const productIds: number[] = []

  if (product) {
    if (product.benefits && product.benefits.length > 0) {
      product?.benefits?.[0]?.items.forEach((i: any) => {
        productIds.push(i.benefitProduct.productId)
      })
    }
  }

  const { data } = useQuery(ProductsQuery, {
    variables: {
      identifiers: productIds,
    },
  })

  if (!data || !product?.benefits?.[0]?.items) {
    return null
  }

  return (
    <LazyRender>
      <div>
        <div className="mb7">
          <ExtensionPoint id="rich-text" />
        </div>
        <ProductGroupProvider>
          <Component
            benefitItems={product?.benefits?.[0]?.items}
            suggestedProducts={data.productsByIdentifier}
          />
        </ProductGroupProvider>
      </div>
    </LazyRender>
  )
}

BuyTogether.schema = {
  type: 'object',
  title: 'Compre Junto',
  properties: {},
}

export default BuyTogether
