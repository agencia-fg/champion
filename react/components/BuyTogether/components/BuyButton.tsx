import React, { useState } from 'react'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { usePixel } from 'vtex.pixel-manager'
import { Button } from 'vtex.styleguide'

interface Props {
  skuItems: any[]
}

const BuyButton: StorefrontFC<Props> = ({ skuItems }) => {
  const [loading, setLoading] = useState(false)
  const { addItems } = useOrderItems()
  const { push } = usePixel()

  const handleClick = async () => {
    const pixelEvent = {
      event: 'cart',
      id: 'add-to-cart-button',
    }

    setLoading(true)
    await addItems(skuItems)

    setLoading(false)

   
    push(pixelEvent)
  }

  return (
    <div className="mt4 w-100">
      <Button
        type="submit"
        variation="primary"
        size="small"
        onClick={() => handleClick()}
        isLoading={loading}
      >
        Comprar junto
      </Button>
    </div>
  )
}

export default BuyButton
