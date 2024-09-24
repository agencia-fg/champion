/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import { deducePercentage } from './utils/deducePercentage'
import style from './styles.css'

interface Props {
  benefitsItems: any[]
  skuItems: any[]
}

const Totals: StorefrontFC<Props> = ({ benefitsItems, skuItems }) => {
  let totalPriceWithoutDiscount = 0
  let totalPrice = 0

  skuItems.forEach(sku => {
    const listPrice = sku.selectedItem.sellers[0].commertialOffer.ListPrice
    const sellingPrice = sku.selectedItem.sellers[0].commertialOffer.Price
    const skuId = sku.selectedItem.itemId

    const { discount } = benefitsItems.find(b =>
      b.benefitSKUIds.includes(skuId)
    )

    totalPriceWithoutDiscount += listPrice ?? 0
    totalPrice += deducePercentage(sellingPrice, discount) ?? 0
  })

  return (
    <div className={`tc ${style.buyTogether__totalsHeading}`}>
      <div className="mv0 b ttu c-emphasis">
        <div className="f1">{benefitsItems.length}</div>
        produtos por
      </div>
      <div className="f4 mv4">
        <div className=" c-muted-2 f6 mb1">
          de{' '}
          <span className="strike">
            <FormattedCurrency value={Math.max(0, totalPriceWithoutDiscount)} />
          </span>
        </div>
        <div className="b f3">
          <FormattedCurrency value={Math.max(0, totalPrice)} />
        </div>
      </div>
    </div>
  )
}

export default Totals
